class Image < ActiveRecord::Base
  belongs_to :user
  belongs_to :mural

  mount_uploader :source, MuralUploader
end
