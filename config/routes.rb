Rails.application.routes.draw do

  resources :artist_profiles, :users

  get 'users/new'

  root "pages#home"

  get "about" =>    "pages#about"
  get "contact" =>  "pages#contact"
end
