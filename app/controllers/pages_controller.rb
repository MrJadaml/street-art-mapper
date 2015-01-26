class PagesController < ApplicationController

  def home
    respond_to do |format|
      format.html do
        @images = Image.all
      end
      format.json do
        render json: MuralData.new.gallery_data
      end
    end
    #scope :artists, -> where(artist: true)
    @users = User.where(artist: true)
  end

  def faq
  end
end
