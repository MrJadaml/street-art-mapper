class CreateFrames < ActiveRecord::Migration
  def change
    create_table :frames do |t|
      t.belongs_to :user
      t.belongs_to :mural
      t.timestamps
    end
  end
end
