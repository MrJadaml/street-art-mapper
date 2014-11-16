class AddUserAssociationToMurals < ActiveRecord::Migration
  def change
    add_column :murals, :user_id, :integer
  end
end
