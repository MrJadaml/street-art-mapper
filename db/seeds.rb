40.times do

  User.create! first_name: Faker::Name.first_name,
                       last_name: Faker::Name.last_name,
                       email: Faker::Internet.email,
                       password: 'password',
                       password_confirmation: 'password',
                       twitter: Faker::Internet.user_name,
                       instagram: Faker::Internet.user_name,
                       artist: [true, false, false].sample
end

12.times do
  Mural.create image: File.open(File.join(Rails.root, 'test.jpg'))
end
