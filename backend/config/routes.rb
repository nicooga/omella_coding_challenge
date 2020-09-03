Rails.application.routes.draw do
  resources :payments, only: %i[index create] do
    collection do
      post :webhook
    end
  end
end
