class User < ActiveRecord::Base
  has_many :authentications
  has_many :frames
  has_many :murals, through: :frames
  #
  # if self.email?
  #   before_save { self.email = email.downcase}
  #   VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  #   validates :email, format: { with: VALID_EMAIL_REGEX },
  #             uniqueness: { case_sensitive: false }
  # end
  validates :first_name, presence: true
  has_secure_password
  validates :password, length: { minimum: 6 }, allow_blank: true

  mount_uploader :avatar, AvatarUploader

  # dependent: :destroy
end
