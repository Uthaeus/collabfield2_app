Rails.application.routes.draw do
  devise_for :users, :controllers => { :registrations => "registrations" }
  devise_scope :user do 
    get 'login', to: 'devise/sessions#new'
    get 'signup', to: 'devise/registrations#new'
  end
  root to: 'pages#index'

  resources :posts do 
    collection do 
      get 'hobby'
      get 'study'
      get 'team'
    end
  end

  resources :contacts, only: [:create, :update, :destroy]

  namespace :private do 
    resources :conversations, only: [:create] do 
      member do 
        post :close
        post :open
      end
    end
    resources :messages, only: [:index, :create]
  end

  namespace :group do 
    resources :conversations do 
      member do 
        post :close
        post :open
      end
    end
    resources :messages, only: [:index, :create]
  end
  
end
