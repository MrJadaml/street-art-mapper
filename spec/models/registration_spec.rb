require 'rails_helper'

describe 'Registration' do

  it 'allow user to register with valid information' do
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

  it 'validates presence of name' do
    user = User.new(first_name: '')
    user.valid?
    expect(user.errors[:first_name].present?).to eq(true)
  end

  it 'validates presence of email' do
    user = User.new(email: '')
    user.valid?
    expect(user.errors[:email].present?).to eq(true)
  end

  it 'validates the uniqueness of an email' do
    User.create!(email: 'bob@mail.com',
                 first_name: 'bob',
                 password: 'password'
                )
                
    user = User.new(email: 'bob@mail.com')
    user.valid?
    expect(user.errors[:email].present?).to eq(true)

    guy = User.new(email: 'hello@mail.com')
    guy.valid?
    expect(guy.errors[:email].present?).to eq(false)
  end

end
