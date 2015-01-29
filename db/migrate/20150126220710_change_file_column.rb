class ChangeFileColumn < ActiveRecord::Migration
  def change
    rename_column :images, :file, :source
  end
end
