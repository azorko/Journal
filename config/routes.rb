Rails.application.routes.draw do
  root to: "root_controller#root"
  resources :posts, only: [:new, :create, :index, :show, :destroy, :update], defaults: {format: :json}
  resources :root, only: [:root], defaults: {format: :json}
end
