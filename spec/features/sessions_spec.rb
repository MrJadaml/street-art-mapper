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

    User.create!(
      first_name: 'Billy',
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
    expect(page).to have_content('Billy')
  end


  scenario "Users can sign out" do

    User.create!(
      first_name: 'Albert',
      last_name: 'Einstein',
      email: 'smart@mail.com',
      password: 'password'
    )

    visit login_path
    fill_in 'Email', with: 'smart@mail.com'
    fill_in 'Password', with: 'password'
    within('.actions') do
      click_on 'Sign in'
    end
    expect(page).to have_content('Albert')
    click_on 'Log out'
    expect(page).to have_content('Sign up')

  end

end
