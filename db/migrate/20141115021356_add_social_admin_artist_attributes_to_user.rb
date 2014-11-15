class AddSocialAdminArtistAttributesToUser < ActiveRecord::Migration
  def change
    add_column :users, :twitter, :string
    add_column :users, :instagram, :string
    add_column :users, :admin, :boolean
    add_column :users, :artist, :boolean
  end
end
