class AddAddressToMurals < ActiveRecord::Migration
  def change
    add_column :murals, :address, :string
  end
end
