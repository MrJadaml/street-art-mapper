Rails.application.routes.draw do

  root    'pages#home'

  resources :murals, :users, :images

  get     'foo'                        => 'users#foo'
  get     'artist/:id'                 => 'users#artist', :as => 'artist'
  get     'about'                      => 'pages#about'
  get     'contact'                    => 'pages#contact'
  get     'faq'                        => 'pages#faq'
  get     'logout'                     => 'sessions#destroy'
  get     'signup'                     => 'sessions#new'
  get     '/auth/:provider/callback'   => 'authentications#create'
  get     'data'                       => 'data#gallery'
  get     'groups'                     => 'data#groups'
  get     'upload'                     => 'data#mural_form'
  patch   'flagged/:id'                => 'images#flagged', :as => 'flagged'
  patch   'unflag/:id'                 => 'images#unflag', :as => 'unflag'
  get     'flagged_content'            => 'pages#flagged'
end
