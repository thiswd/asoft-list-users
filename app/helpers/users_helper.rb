module UsersHelper

  def pages_amount
    (@users.length / User::PER_PAGE).ceil
  end

  def active_page(n)
    if n == 1
      "bg-stone-500 text-gray-100 cursor-default"
    else
      "hover:bg-gray-100 hover:text-gray-700"
    end
  end

end
