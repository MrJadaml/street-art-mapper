class AddClaimId < ActiveRecord::Migration
  def change
    add_column :users, :claim_id, :integer
  end
end
