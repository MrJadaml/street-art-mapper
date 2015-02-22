class UsersController < ApplicationController
  before_action :logged_in_user, only: [:create, :destroy]

  def index
    @users = User.where(artist: true)
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to root_path
    else
      render :new
    end
  end

  def show
    set_user
    respond_to do |format|
      format.html do
        @murals = @user.murals
        @images = @user.images
      end
      format.json do
        if @user.artist?
          render json: MuralData.new.artist_data(@user.id)
        else
          render json: MuralData.new.profile_data(@user.id)
        end
      end
    end
  end

  def artist
    set_user
    respond_to do |format|
      format.html do
        @murals = Mural.joins(:ownerships).where({"ownerships.user_id" => @user.id}).uniq
      end
      format.json do
        render json: MuralData.new.artist_data(@user.id)
      end
    end
  end

  def foo
    #are you an artist page
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
    redirect_to root_path, notice: "User was deleted successfully"
  end


  def unflagged_images(mural)
    mural.images.where(flagged: false)[0].source.url(:user_ablum)
  end

  def mural_has_unflagged_images(mural)
    mural.images.where(flagged: false).length == 0
  end

  helper_method :unflagged_images
  helper_method :mural_has_unflagged_images

  private

    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(
        :first_name,
        :last_name,
        :email,
        :password,
        :twitter,
        :instagram,
        :avatar,
        :avatar_cache,
        :artist,
      )
    end

end
