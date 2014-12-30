Rails.application.routes.draw do

  root    'pages#home'

  resources :murals, :users

  get     'foo'                        => 'users#foo'
  get     'claim_profile'              => 'users#claim_profile'
  get     'signup'                     => 'registrations#new'
  post    'signup'                     => 'registrations#create'
  get     'about'                      => 'pages#about'
  get     'contact'                    => 'pages#contact'
  get     'faq'                        => 'pages#faq'
  get     'logout'                     => 'sessions#destroy'
  get     'login'                      => 'sessions#new'
  post    'login'                      => 'sessions#create'
  get     '/auth/:provider/callback'   => 'authentications#create'
end
