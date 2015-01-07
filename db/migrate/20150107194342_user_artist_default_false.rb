class UserArtistDefaultFalse < ActiveRecord::Migration
  def change
    change_column :users, :artist, :boolean, default: false, null: false
  end
end
