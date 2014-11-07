class ArtistProfile < ActiveRecord::Base

  def full_moniker
    first_name + " " + second_name
  end

end
