require 'rails_helper'

describe 'Image' do

  def setup
    @user = users(:nate)
    @mural = Mural.create image: File.open(File.join(Rails.root, 'test.jpg'))
  end

  it 'should be valid' do
    @mural.valid?
  end

  it 'should have a user id' do
    @mural.user_id = nil
    expect(@mural.valid?).to be(false)
  end

end
