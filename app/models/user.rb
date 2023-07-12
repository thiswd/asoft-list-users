class User
  attr_accessor :id, :name, :age, :email

  def initialize(attributes = {})
    @id = attributes["id"]
    @name = attributes["name"]
    @age = attributes["age"]
    @email = attributes["email"]
    @address = attributes["address"]
  end
end
