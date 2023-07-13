require "net/http"
require "json"

class FetchUserService
  attr_reader :url

  GET_USERS_PATH = "https://run.mocky.io/v3/ce47ee53-6531-4821-a6f6-71a188eaaee0"

  def initialize(url = GET_USERS_PATH)
    @url = url
  end

  def self.call
    new.call
  end

  def call
    begin
      response = Net::HTTP.get(URI(url))
      result = JSON.parse(response)
      result["users"]
    rescue => e
      Rails.logger.error("Failed to fetch users: #{e.message}")
      raise e
    end
  end
end
