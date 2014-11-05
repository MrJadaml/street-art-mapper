Rails.application.routes.draw do

  resources :artist_profiles, :users

  root    'pages#home'
  get     'signup'     => 'registrations#new'
  post    'signup'     => 'registrations#create'
  get     'about'      => 'pages#about'
  get     'contact'    => 'pages#contact'
  get     'login'      => 'sessions#new'
  post    'login'      => 'sessions#create'
  delete  'logout'     => 'sessions#destroy'
end
