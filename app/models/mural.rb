class Mural < ActiveRecord::Base
  has_many :ownerships
  has_many :images
  has_many :users, through: :ownership
  # default_scope -> { order('created_at DESC') }
  # validates :image, :latitude, :longitude, presence: true

  # Original:
  # Mural.where(latitude: minlat..maxlat).where(longitude: minlng..maxlng)

  # Define named scopes in the model to use later:
  # scope :between_latitudes, ->(min_lat, max_lat) { where(latitude: min_lat..max_lat)}
  # scope :between_longitudes, ->(min_lng, max_lng) { where(longitudes: min_lng..max_lng)}

  # The refactored original query:
  # Mural.between_latitudes(minlat, maxlat).between_longitudes(minlng, maxlng)

  def as_gallery_data
    map_set(images[0].source.url(:thumb))
  end

  def as_artist_data
    map_set(images[0].source.url(:thumb))
  end

  def as_show_data
    map_set[:geometry].delete(:image)
  end

  def to_hash
    mural = {}
    mural[:latitude] = latitude
    mural[:longitude] = longitude
    # doesnt account for multiple ownerships
    mural[:artist_id] = ownerships[0].user_id
    mural[:mural_id] = id
    mural[:image] = images[0].source.user_ablum.url
    mural
  end

private

  def map_set(*image)
    { type: 'Feature',
      geometry: {
        type: 'Point',
        id: id,
        coordinates: [longitude, latitude],
        image: image
     }
   }
  end
end
