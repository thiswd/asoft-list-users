class UsersController < ApplicationController

  def index
    user_data = FetchUserService.call
    @users = user_data.map { |user| User.new(user) }
    @first_users = @users.slice(0, User::PER_PAGE)

    respond_to do |format|
      format.html
      format.json { render json: @users }
    end
  end

end
