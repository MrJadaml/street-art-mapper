class RemoveGroupIdFromMurals < ActiveRecord::Migration
  def change
    remove_column :murals, :group_id, :integer
  end
end
