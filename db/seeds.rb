30.times do

  ArtistProfile.create first_name: Faker::Name.first_name,
                       second_name: Faker::Name.last_name,
                       twitter: Faker::Internet.user_name,
                       instagram: Faker::Internet.user_name

end
