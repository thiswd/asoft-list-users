require "rails_helper"

RSpec.describe FetchUserService do
  describe ".call" do
    let(:url) { URI(FetchUserService::GET_USERS_PATH) }

    context "when the request is successful" do
      let(:response_body) do
        {
          users: [
            {
              name: "Usuário da API",
              age: 20,
              email: "da.api@example.com"
            }
          ]
        }.to_json
      end

      before do
        allow(Net::HTTP).to receive(:get).with(url).and_return(response_body)
      end

      it "fetches users from external service" do
        users = FetchUserService.call
        expect(users).to match_array(
          [
            { "name" => "Usuário da API", "age" => 20, "email" => "da.api@example.com" }
          ]
        )
      end
    end

    context "when the request fails" do
      before do
        allow(Net::HTTP).to receive(:get).with(url).and_raise(StandardError.new("Error message"))
      end

      it "raises an error" do
        expect { FetchUserService.call }.to raise_error(StandardError, "Error message")
      end
    end
  end
end
