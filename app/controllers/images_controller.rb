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
    @image = current_user.images.new(image_params)
    if @image.save
      owner = Ownership.new(user_id: params['image']['ownerships']['user_id'], mural_id: params['image']['ownerships']['mural_id'])
      owner.save
      if params['image']['mural_id'].empty?
        mural = Mural.new(latitude: params['image']['murals']['latitude'], longitude: params['image']['murals']['longitude'])
        mural.save
      end
      redirect_to :root
    else
      render :new
    end
  end

  def show
    @image = Image.find(params[:id])
    @artist = User.find(@image.mural.ownerships[0]['user_id'])
  end

  private

    def image_params
      params.require(:image).permit(
        :user_id,
        :mural_id,
        :source,
        :source_cache
      )
    end
end
