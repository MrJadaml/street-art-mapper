class MuralsController < ApplicationController

  def index
    @murals = Mural.all
  end

  def new
    @mural = Mural.new
  end

  def create
    @mural = Mural.new(mural_params)
    if @mural.save
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
      params.require(:mural).permit(:image, :image_cache, :buffed)
    end

    def set_mural
      @mural = Mural.find(params[:id])
    end

end
