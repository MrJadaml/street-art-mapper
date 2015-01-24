class RemoveUserIdFromMurals < ActiveRecord::Migration
  def change
    remove_column :murals, :user_id, :integer
  end
end
