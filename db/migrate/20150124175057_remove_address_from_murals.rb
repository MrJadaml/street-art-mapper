class RemoveAddressFromMurals < ActiveRecord::Migration
  def change
    remove_column :murals, :address, :string
  end
end
