Rails.application.routes.draw do

  resources :artist_profiles, :users, :street_galleries

  root    'pages#home'
  get     'signup'     => 'registrations#new'
  post    'signup'     => 'registrations#create'
  get     'about'      => 'pages#about'
  get     'contact'    => 'pages#contact'
  get     'login'      => 'sessions#new'
  post    'login'      => 'sessions#create'
  get     'logout'     => 'sessions#destroy'
end
