ExampleProfile::Application.routes.draw do
  
  devise_for :users, :controllers => { :omniauth_callbacks => "omniauth_callbacks" }
  
  match 'user_info', :to => 'current_user#user_info'
  match 'select_role', :to => 'current_user#select_role'

  root :to => 'pages#index'

end
