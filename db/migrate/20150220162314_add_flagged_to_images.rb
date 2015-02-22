class AddFlaggedToImages < ActiveRecord::Migration
  def change
    add_column :images, :flagged, :boolean, default: false, null: false
  end
end
