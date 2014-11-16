class User < ActiveRecord::Base
  has_many :frames
  has_many :murals, dependent: :destroy

  before_save { self.email = email.downcase }
  validates :first_name, presence: true
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true,
            format: { with: VALID_EMAIL_REGEX },
            uniqueness: { case_sensitive: false }
  has_secure_password
  validates :password, length: { minimum: 6 }, allow_blank: true

  mount_uploader :avatar, AvatarUploader

end
