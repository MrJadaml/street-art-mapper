class AuthenticationsController < ApplicationController
  def index
    @authentications = current_user.authentications if current_user
  end

  def create
    omniauth = request.env['omniauth.auth']
    authentication = Authentication.find_by(provider: omniauth['provider'], uid: omniauth['uid'])
    if authentication
      session[:id] = authentication.user_id
      flash[:notice] = 'You are now signed in'
      redirect_to user_path(authentication.user_id)
    elsif current_user
      current_user.authentications.create!(provider: omniauth['provider'], uid: omniauth['uid'])
      flash[:notice] = "Successfully added #{omniauth['provider']} authentication"
      redirect_to user_path(current_user.id)
    else
      user = User.new
      user.authentications.build(provider: omniauth['provider'], uid: omniauth['uid'])
      user.save(validate: false)
      flash[:notice] = 'You are now signed in'
      session[:id] = user.id
      redirect_to user_path(user.id)
    end
  end

  def destroy
    @authentications = current_user.authentications.find(params[:id])
    @authentication.destroy
    flash[:notice] = 'Successfully destroyed authentication'
    redirect_to users_path
  end
end
