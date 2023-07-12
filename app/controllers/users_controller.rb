class UsersController < ApplicationController

  def index
    user_data = FetchUserService.call
    build_users = user_data.map { |user| User.new(user) }
    @users = Kaminari.paginate_array(build_users).page(params[:page]).per(10)
  end

end
