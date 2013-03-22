class CurrentUserController < ApplicationController

  def user_info
    response = {}
    if signed_in?
      response['logged_in'] = true
      response['user_id'] = current_user.id
      response['email'] = current_user.email
      response['name'] = current_user.name
      response['role'] = current_user.role
    else
      response['logged_in'] = false
    end

    respond_to do |format|
      format.json { render json: response }
    end
  end

  def select_role
    role = params[:role];

    response = {}
    if signed_in?
      response['logged_in'] = true
      @user = current_user
      response['status'] = @user.update_attribute(:role, role)
    else
      response['logged_in'] = false
    end

    respond_to do |format|
      format.json { render json: response }
    end
  end
  
end