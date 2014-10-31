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
    if @artist_profile.update(artist_profile_params)
      redirect_to @artist_profile
    else
      render :edit
    end
  end

  def destroy
    ArtistProfile.find(params[:id]).destroy
    redirect_to artist_profiles_path
  end

  private

  def artist_profile_params
    params.require(:artist_profile).permit(:first_name, :second_name, :twitter, :instagram)
  end

  def set_artist_profile
    @artist_profile = ArtistProfile.find(params[:id])
  end
end
