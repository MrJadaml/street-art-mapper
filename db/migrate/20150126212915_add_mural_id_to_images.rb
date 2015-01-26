class AddMuralIdToImages < ActiveRecord::Migration
  def change
    add_column :images, :mural_id, :integer
  end
end
