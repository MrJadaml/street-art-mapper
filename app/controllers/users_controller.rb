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
      redirect_to users_path
    else
      render :new
    end
  end

  def show
    set_user
    respond_to do |format|
      format.html do
        @murals = @user.murals.paginate(page: params[:page])
      end
      format.json do
        render json: MuralData.new.profile_data(@user.id)
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
    redirect_to users_path, notice: "User was deleted successfully"
  end

  private

    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(
        :first_name,
        :last_name,
        :email,
        # :password,
        :twitter,
        :instagram,
        :avatar,
        :avatar_cache,
        :artist,
      )
    end

end
