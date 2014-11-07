class CreateStreetGalleries < ActiveRecord::Migration
  def change
    create_table :street_galleries do |t|
      t.string :mural_image
      t.boolean :active
    end
  end
end
