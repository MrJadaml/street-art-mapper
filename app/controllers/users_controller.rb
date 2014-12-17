require 'pry'
class UsersController < ApplicationController
  before_action :logged_in_user, only: [:create, :destroy]

  def index
    #scope :artists, -> where(artist: true)
    @users = User.where(artist: true)
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:id] = @user.id
      redirect_to @user
    else
      render :new
    end
  end

  def show
    set_user
    @murals = @user.murals.paginate(page: params[:page])
    @pins = @user.murals
    respond_to do |format|
      format.html
      format.json do
        json = {
          type: "FeatureCollection",
          features: []
        }
        @pins.each do |pin|
          json[:features] << {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [pin.longitude, pin.latitude]
            }
          }
        end
        render json: json
      end
    end
  end

  def blah
    @user = current_user
  end

  def edit
    set_user
  end

  def update
    set_user
    if @user.update(user_params)
      redirect_to @user, notice: "Profile was successfully updated"
    else
      render :edit
    end
  end

  def destroy
    set_user
    User.find(params[:id]).destroy
    redirect_to users_path, notice: "User was deleted successfully"
  end

  private

    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:first_name, :last_name, :email, :password, :twitter, :instagram, :avatar, :avatar_cache)
    end

end
