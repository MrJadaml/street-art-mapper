class MuralsController < ApplicationController

  def index
    @murals = Mural.all
    respond_to do |format|
      format.html
      format.json do
        json = {
          type: "FeatureCollection",
          features: []
        }
        @murals.each do |mural|
          json[:features] << {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [mural.longitude, mural.latitude]
            }
          }
        end
        render json: json
      end
    end
  end

  def new
    if current_user
      @mural = current_user.murals.build
    else
      redirect_to login_path
    end
  end

  def create
    @mural = current_user.murals.build(mural_params)
    if @mural.save
      # figure out best practice for saving frame - error validations
      # frame for user uploading mural
      Frame.create!(user_id: current_user.id, mural_id: @mural.id)
      # frame for artist
      Frame.create!(user_id: params[:mural][:user_id], mural_id: @mural.id)
      flash[:success] = 'Image posted'
      redirect_to murals_path
    else
      render :new
    end
  end

  def show
    set_mural
  end

  def edit
    set_mural
  end

  def destroy
    if set_mural.destroy
      redirect_to murals_path
    else
      render :edit
    end
  end


  private

    def mural_params
      params.require(:mural).permit(:image, :image_cache, :buffed, :user_id, :address, :longitude, :latitude)
    end

    def set_mural
      @mural = Mural.find(params[:id])
    end

end
