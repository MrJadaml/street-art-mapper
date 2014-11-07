class StreetGallery < ActiveRecord::Base
  mount_uploader :mural_image, StreetsUploader
end
