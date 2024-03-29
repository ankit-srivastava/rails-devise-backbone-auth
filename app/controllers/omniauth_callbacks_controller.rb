class OmniauthCallbacksController < Devise::OmniauthCallbacksController

def facebook
    # You need to implement the method below in your model (e.g. app/models/user.rb)
    @user = User.find_for_facebook_oauth(request.env["omniauth.auth"], current_user)

    if @user.persisted?
      sign_in @user, :event => :authentication #this will throw if @user is not activated
      # set_flash_message(:notice, :success, :kind => "Facebook") if is_navigational_format?
    else
      session["devise.facebook_data"] = request.env["omniauth.auth"]
      
    end
    redirect_to '/'
end

end