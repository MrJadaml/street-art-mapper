class RemoveMuralAttrs < ActiveRecord::Migration
  def change
    remove_column :murals, :buffed, :boolean
  end
end
