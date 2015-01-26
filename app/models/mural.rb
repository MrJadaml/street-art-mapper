class Mural < ActiveRecord::Base
  has_many :ownerships
  has_many :images
  has_many :users, through: :ownership
  accepts_nested_attributes_for :ownerships
  accepts_nested_attributes_for :images
  # default_scope -> { order('created_at DESC') }
  # validates :image, :latitude, :longitude, presence: true

end
