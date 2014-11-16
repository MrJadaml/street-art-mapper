require 'rails_helper'

describe 'Mural' do

  it 'checks that user is valid' do
    user = User.new
    expect(user.valid?).to be(false)
    user.first_name = 'Albert'
    expect(user.valid?).to be(false)
    user.email = 'smart@mail.com'
    expect(user.valid?).to be(false)
    user.password = 'password'
    user.password_confirmation = 'password'
    expect(user.valid?).to be(true)
  end

  it 'should be valid' do
    user = User.create!(
                 first_name: 'Albert',
                  last_name: 'Einstein',
                      email: 'bob@mail.com',
                   password: 'password',
      password_confirmation: 'password',
                )
    mural = user.murals.create!(image: File.open(File.join(Rails.root, 'test.jpg')),
                         )
    expect(mural.valid?).to be(true)
    puts user.id
    puts mural.user_id
  end

  it 'should have a user id' do
    skip

    @mural.user_id = nil
    expect(@mural.valid?).to be(false)
  end

end
