Rails.application.routes.draw do

  resources :users, :murals

  root    'pages#home'
  get     'signup'     => 'registrations#new'
  post    'signup'     => 'registrations#create'
  get     'about'      => 'pages#about'
  get     'contact'    => 'pages#contact'
  get     'faq'        => 'pages#faq'
  get     'blah'       => 'users#blah'
  get     'login'      => 'sessions#new'
  post    'login'      => 'sessions#create'
  get     'logout'     => 'sessions#destroy'
end
