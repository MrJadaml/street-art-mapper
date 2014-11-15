class Frame < ActiveRecord::Base
  belongs_to :user
  has_one :mural


end
