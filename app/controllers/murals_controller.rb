class MuralsController < ApplicationController
  # before_action :logged_in_user, only: [:create, :destroy]

  def new
    if current_user
      @mural = current_user.murals.build
      @mural.ownerships.build
      @mural.images.build
    else
      redirect_to :root, notice: 'You must be logged in to add murals to the map.'
    end
  end

  def create
    @image = current_user.murals.build(mural_params)
    if @image.save
      redirect_to :root
    else
      render :new
    end
  end

  def show
    set_mural
    @user = User.find(@mural.user_id)
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
    set_mural
  end

  def destroy
    if set_mural.destroy
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
        images_attributes: [:file, :file_cache ],
        ownerships_attributes: [:user_id]
      )
    end

    def set_mural
      @mural = Mural.find(params[:id])
    end

end
