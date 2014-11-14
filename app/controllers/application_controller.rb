class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  # Hartl's approach to session ids
  # include SessionsHelper

  def index
    @user = User.find(parms[:id])
  end

  def current_user
    User.find_by(id: session[:id])
  end

  def full_name
    first_name + ' ' + last_name
  end

  helper_method :current_user
end
