class DataController < ApplicationController

  def gallery
    render json: MuralData.new.gallery_data
  end
end
