Rails.application.routes.draw do

  root    'pages#home'

  resources :murals, :users

  get     'foo'                        => 'users#foo'
  get     'about'                      => 'pages#about'
  get     'contact'                    => 'pages#contact'
  get     'faq'                        => 'pages#faq'
  get     'logout'                     => 'sessions#destroy'
  get     'signup'                     => 'sessions#new'
  get     '/auth/:provider/callback'   => 'authentications#create'
  get     'data'                       => 'data#gallery'
end
