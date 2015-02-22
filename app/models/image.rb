class Image < ActiveRecord::Base
  belongs_to :user
  belongs_to :mural

  mount_uploader :source, MuralUploader


  def ensure_not_flagged
    self.where(flagged: false)
  end
end
