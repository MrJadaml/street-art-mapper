class AddMuralGroupId < ActiveRecord::Migration
  def change
    add_column :murals, :group_id, :integer
  end
end
