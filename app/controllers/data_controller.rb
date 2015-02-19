class DataController < ApplicationController

  def gallery
    render json: MuralData.new.gallery_data
  end

  def groups
    render json: MuralData.new.group_data(params)
  end

  def mural_form
    render json: MuralData.new.gallery_data(params)
  end

private

  def group_params
    params.require(:mural).permit(:maxlat, :maxlng, :minlat, :min)
  end
end
