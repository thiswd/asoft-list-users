class User
  attr_accessor :id, :name, :age, :email

  PER_PAGE = 10

  def initialize(attributes = {})
    @id = attributes["id"]
    @name = attributes["name"]
    @age = attributes["age"]
    @email = attributes["email"]
    @address = attributes["address"]
  end
end
