class CreateArtistProfiles < ActiveRecord::Migration
  def change
    create_table :artist_profiles do |t|
      t.string :first_name
      t.string :second_name
      t.string :twitter
      t.string :instagram
      
    end
  end
end
