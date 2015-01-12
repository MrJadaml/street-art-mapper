class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  # Hartl's approach to session ids
  include SessionsHelper

  # def index
  #   @user = User.find(parms[:id])
  # end

  def current_user
    User.find_by(id: session[:id])
  end

  def logged_in_user
    unless logged_in?
      store_location
      redirect_to login_path, notice: 'Please log in'
    end
  end

  def full_name
    first_name + ' ' + last_name
  end

  helper_method :current_user

  class AccessDenied < StandardError
  end

  rescue_from AccessDenied, with: :serve_404

  def serve_404
    render 'public/404', status: :not_found, layout: false
  end
end
