class Mural < ActiveRecord::Base
  belongs_to :user
  default_scope -> { order('created_at DESC') }
  validates :user_id, presence: true


  mount_uploader :image, MuralUploader
end
