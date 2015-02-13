class MuralsController < ApplicationController
  # before_action :logged_in_user, only: [:create, :destroy]

  def new
    if current_user
      @image = current_user.images.build
      @image.ownerships.build

      @mural = current_user.murals.build
      @mural.ownerships.build
      @mural.images.build
    else
      redirect_to :root, notice: 'You must be logged in to add murals to the map.'
    end
  end

  def create
    @mural = current_user.murals.new(mural_params)
    if @mural.save
      redirect_to :root
    else
      render :new
    end
  end

  def show
    @mural = Mural.find(params[:id])
    @images = @mural.images
    @artist = User.find(@mural.ownerships[0].user_id)
    respond_to do |format|
      format.html do
        @mural
      end
      format.json do
        render json: MuralData.new.show_data(params[:id])
      end
    end
  end

  def edit
    @image = Image.find(params[:id])
  end

  def destroy
    @image = Image.find(params[:id])
    if @image.destroy
      redirect_to :root
    else
      render :edit
    end
  end


  private

    def mural_params
      params.require(:mural).permit(
        :longitude,
        :latitude,
        images_attributes: [:user_id, :source, :source_cache ],
        ownerships_attributes: [:user_id]
      )
    end

    def image_params
      params.require(:mural).permit(
        images_attributes: [:user_id, :source, :source_cache ],
      )
    end

end
