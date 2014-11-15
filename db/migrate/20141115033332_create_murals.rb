class CreateMurals < ActiveRecord::Migration
  def change
    create_table :murals do |t|
      t.string :image
      t.boolean :buffed
    end
  end
end
