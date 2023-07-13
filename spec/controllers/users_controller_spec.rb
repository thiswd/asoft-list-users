require "rails_helper"

describe UsersController do
  render_views

  describe "GET #index" do
    it "populates an array of users" do
      users = [
        {name: "Usuário 1", age: 30, email: "primeiro@example.com"},
        {name: "Usuário 1000", age: 25, email: "jane.ultimo@example.com"}
      ]
      allow(FetchUserService).to receive(:call).and_return(users)

      get :index, format: :json

      expect(assigns(:users).length).to eq(2)
      expect(response).to be_successful
    end
  end
end
