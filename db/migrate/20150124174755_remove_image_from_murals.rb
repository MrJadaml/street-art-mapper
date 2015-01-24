class RemoveImageFromMurals < ActiveRecord::Migration
  def change
    remove_column :murals, :image, :string
  end
end
