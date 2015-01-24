class CreateOwnerships < ActiveRecord::Migration
  def change
    create_table :ownerships do |t|
      t.belongs_to :user
      t.belongs_to :mural
      
      t.timestamps
    end
  end
end
