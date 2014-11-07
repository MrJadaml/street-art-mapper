class StreetGalleriesController < ApplicationController

  def index
    @street_galleries = StreetGallery.all
  end

  def new
    @street_gallery = StreetGallery.new
  end

  def create
    @street_gallery = StreetGallery.new(params.require(:street_gallery).permit(:image_mural, :active))
    if @street_gallery.save
      redirect_to street_galleries_path
    else
      render :new
    end
  end
end
