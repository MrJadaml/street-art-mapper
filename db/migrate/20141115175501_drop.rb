class Drop < ActiveRecord::Migration
  def change
    drop_table :artist_profiles
  end
end
