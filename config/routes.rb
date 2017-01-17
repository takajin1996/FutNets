Rails.application.routes.draw do
  get 'comments/create'

  resources :movies do
    resources :comments
  end
  resources :schedules
  root to: 'first#index'
  get 'movie/index'

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
