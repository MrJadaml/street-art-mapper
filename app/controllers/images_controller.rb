class ImagesController < ApplicationController

  def new
    if current_user
      @image = current_user.images.build
      @image.user.ownerships.build
      # @image.user.murals.build
    else
      redirect_to :root, notice: 'You must be logged in to add murals to the map.'
    end
  end

  def create
    @image = current_user.images.new(mural_params)
    binding.pry
    @image.user.ownerships.new(mural_params)

    if @image.save
      binding.pry
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

    def mural_params
      params.require(:image).permit(
        :user_id,
        :source,
        :source_cache,
        ownerships_attributes: [:user_id]
      )
    end
end
