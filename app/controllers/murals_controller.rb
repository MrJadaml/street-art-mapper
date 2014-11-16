class MuralsController < ApplicationController

  def index
    @murals = Mural.all
  end

  def new
    if current_user
      @mural = current_user.murals.build
    else
      redirect_to login_path
    end
  end

  def create
    @mural = current_user.murals.build(mural_params)
    if @mural.save
      flash[:success] = 'Image posted'
      redirect_to murals_path
    else
      render :new
    end
  end

  def show
    set_mural
  end

  def edit
    set_mural
  end

  def destroy
    if set_mural.destroy
      redirect_to murals_path
    else
      render :edit
    end
  end


  private

    def mural_params
      params.require(:mural).permit(:image, :image_cache, :buffed, :user_id)
    end

    def set_mural
      @mural = Mural.find(params[:id])
    end

end
