class Mural < ActiveRecord::Base
  has_one :frame
  has_one :user, through: :frame

  mount_uploader :image, MuralUploader
end
