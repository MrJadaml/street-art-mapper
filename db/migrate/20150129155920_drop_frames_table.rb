class DropFramesTable < ActiveRecord::Migration
  def change
    drop_table :frames
  end
end
