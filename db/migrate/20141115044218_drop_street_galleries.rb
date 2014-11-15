class DropStreetGalleries < ActiveRecord::Migration
  def change
    drop_table :street_galleries
  end
end
