class UsersController < ApplicationController

  def index
    user_data = FetchUserService.call
    @users = user_data.map { |user| User.new(user) }
    @first_users = @users.slice(0, 10)

    respond_to do |format|
      format.html
      format.json { render json: @users }
    end
  end

end
