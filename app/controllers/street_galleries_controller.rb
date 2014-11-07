class StreetGalleriesController < ApplicationController

  def index
    # @street_galleries = Street_gallery.all
  end

  def new
    @street_gallery = StreetGallery.new
  end
end
