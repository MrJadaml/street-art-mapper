class AddMultipleKeyIndexForImages < ActiveRecord::Migration
  def change
    add_column :murals, :created_at, :datetime
    add_column :murals, :updated_at, :datetime
    add_index :murals, [:user_id, :created_at]
  end
end
