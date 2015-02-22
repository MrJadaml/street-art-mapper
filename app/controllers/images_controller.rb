class ImagesController < ApplicationController

  def new
    if current_user
      @image = current_user.images.build
      owner = Ownership.new
      mural = Mural.new
    else
      redirect_to :root, notice: 'You must be logged in to add murals to the map.'
    end
  end

  def create
    if params['image']['mural_id'].empty?
      # create Mural
      mural = Mural.new(latitude: params['image']['murals']['latitude'], longitude: params['image']['murals']['longitude'])
      mural.save
      # create Image
      @image = current_user.images.new(mural_id: mural.id, source: params['image']['source'])
      if @image.save
        # create Ownership
        owner = Ownership.new(user_id: params['image']['ownerships']['user_id'], mural_id: mural.id)
        owner.save
        redirect_to :root
      else
        render :new
      end
    else
      # create Image
      @image = current_user.images.new(mural_id: params['image']['mural_id'], source: params['image']['source'])
      if @image.save
        # create Ownership
        owner = Ownership.new(user_id: params['image']['ownerships']['user_id'], mural_id: params['image']['mural_id'])
        owner.save
        redirect_to :root
      else
        render :new
      end
    end
  end

  def show
    @image = Image.find(params[:id])
    @artist = User.find(@image.mural.ownerships[0]['user_id'])
  end

  def flagged
    image = Image.find(params[:id])
    image.update(flagged: true)
    redirect_to root_path
  end

  def unflag
    image = Image.find(params[:id])
    image.update(flagged: false)
    redirect_to flagged_content_path
  end

  def destroy
    image = Image.find(params[:id])
    if image.destroy
      redirect_to :root
    else
      render :edit
    end
  end

end
