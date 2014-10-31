class ArtistProfilesController < ApplicationController

  def index
    @artist_profiles = ArtistProfile.all
  end

  def new
    @artist_profile = ArtistProfile.new
  end

  def create
    @artist_profile = ArtistProfile.new(artist_profile_params)
    if @artist_profile.save
      redirect_to @artist_profile
    else
      render :new
    end
   #why is this end needed??? It breaks without it.
  end

  def show
    set_artist_profile
  end

  def edit
    set_artist_profile
  end

  def update
    set_artist_profile
  end

  def destroy
    set_artist_profile
  end

  private

  def artist_profile_params
    params.require(:artist_profile).permit(:first_name, :second_name, :twitter, :instagram)
  end

  def set_artist_profile
    @artist_profile = ArtistProfile.find(params[:id])
  end
end
