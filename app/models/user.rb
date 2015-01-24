class User < ActiveRecord::Base
  has_many :authentications, dependent: :destroy
  has_many :images
  has_many :ownerships
  has_many :murals, through: :ownerships
  # has_many :frames
  #
  # if self.email?
  #   before_save { self.email = email.downcase}
  #   VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  #   validates :email, format: { with: VALID_EMAIL_REGEX },
  #             uniqueness: { case_sensitive: false }
  # end
  validates :first_name, presence: true

  mount_uploader :avatar, AvatarUploader

  # dependent: :destroy
end
