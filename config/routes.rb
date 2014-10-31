Rails.application.routes.draw do

  resources :artist_profiles

  get 'users/new'

  root "pages#home"

  get "about" =>    "pages#about"
  get "contact" =>  "pages#contact"
end
