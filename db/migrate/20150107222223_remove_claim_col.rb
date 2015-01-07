class RemoveClaimCol < ActiveRecord::Migration
  def change
    remove_column :users, :claim_id
  end
end
