class SessionsController < ApplicationController

  def new
    @user = User.new
  end

  def create
    user = User.find_by_email(params[:email])
    if user && user.authenticate(params[:password])
      session[:id] = user.id
      redirect_to user
    else
      @sign_in_error = 'Invalid email/password'
      render :new
    end
  end

  def destroy
    session.destroy
    redirect_to root_path
  end

end
