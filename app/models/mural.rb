class Mural < ActiveRecord::Base
  has_many :frames
  has_many :users, through: :frames
  default_scope -> { order('created_at DESC') }
  validates :user_id, :image, :latitude, :longitude, presence: true

  mount_uploader :image, MuralUploader
end
