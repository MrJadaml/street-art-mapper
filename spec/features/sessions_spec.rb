require 'rails_helper'

  feature "Sessions" do

  scenario "Users can't sign in with blank password" do

    visit root_path
    click_on 'Log in'
    fill_in 'Email', with: 'mail@mail.com'
    fill_in 'Password', with: '   '
    within('.actions') do
      click_on 'Sign in'
    end
    expect(page).to have_content('password')
  end

  scenario "Users can't sign in with blank email" do
    skip

    visit root_path
    click_on 'Log in'
    fill_in 'Email', with: '   '
    fill_in 'Password', with: 'password'
    within('.actions') do
      click_on 'Sign in'
    end
    expect(page).to have_content('password')
  end

  scenario "Users can sign in with valid information" do
    skip

    User.create!(
      email: 'mail@mail.com',
      password: 'password'
    )

    visit root_path
    click_on 'Log in'
    fill_in 'Email', with: 'mail@mail.com'
    fill_in 'Password', with: 'password'
    within('.actions') do
      click_on 'Sign in'
    end
    current_path.should == root_path
  end


  scenario "Users can sign out" do
    skip

    User.create!(
      first_name: 'Albert',
      last_name: 'Einstein',
      email: 'mail@mail.com',
      password: 'password'
    )

    visit login_path
    fill_in 'Email', with: 'mail@mail.com'
    fill_in 'Password', with: 'password'
    within('.actions') do
      click_on 'Sign in'
    end
    expect(page).to have_content('Albert Einstein')
    click_on 'Sign out'
    expect(page).to have_content('Sign up')

  end

end
