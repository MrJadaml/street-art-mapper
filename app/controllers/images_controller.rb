class ImagesController < ApplicationController
  def show
    @image = Image.find(params[:id])
    @artist = User.find(@image.mural.ownerships[0]['user_id'])
  end
end
