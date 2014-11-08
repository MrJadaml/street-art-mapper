class StreetGalleriesController < ApplicationController

  def index
    @street_galleries = StreetGallery.all
  end

  def new
    @street_gallery = StreetGallery.new
  end

  def create
    @street_gallery = StreetGallery.new(gallery_params)
    if @street_gallery.save
      redirect_to street_galleries_path
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
      redirect_to street_galleries_path
    else
      render :edit
    end
  end


  private

  def gallery_params
    params.require(:street_gallery).permit(:mural_image, :mural_image_cache, :active)
  end

  def set_mural
    @street_gallery = StreetGallery.find(params[:id])
  end

end
