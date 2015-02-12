class Image < ActiveRecord::Base
  belongs_to :user
  belongs_to :mural

  accepts_nested_attributes_for :user

  mount_uploader :source, MuralUploader
end
