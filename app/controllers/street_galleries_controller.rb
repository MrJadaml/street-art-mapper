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

  private

  def gallery_params
    params.require(:street_gallery).permit(:mural_image, :mural_image_cache, :active)
  end

end
