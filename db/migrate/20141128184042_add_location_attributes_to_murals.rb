class AddLocationAttributesToMurals < ActiveRecord::Migration
  def change
    add_column :murals, :latitude, :float
    add_column :murals, :longitude, :float
  end
end
