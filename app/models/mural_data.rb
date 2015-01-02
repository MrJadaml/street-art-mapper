class MuralData

  def gallery_data
    murals = Mural.all
    json = {
      type: "FeatureCollection",
      features: []
    }
    murals.each do |mural|
      json[:features] << {
        type: 'Feature',
        geometry: {
          type: 'Point',
          id: mural.id,
          coordinates: [mural.longitude, mural.latitude],
          image: mural.image.url(:thumb)
        }
      }
    end
    json
  end

  def profile_data(user_id)
    json = {}

    murals = User.find(user_id).murals
    json = {
      type: "FeatureCollection",
      features: []
    }
    murals.each do |mural|
      json[:features] << {
        type: 'Feature',
        geometry: {
          type: 'Point',
          id: mural.id,
          coordinates: [mural.longitude, mural.latitude],
          image: mural.image.url(:thumb)
        }
      }
    end
    json
  end

  def show_data(mural_id)
    json = {}

    mural = Mural.find(mural_id)
    json = {
      type: "FeatureCollection",
      features: []
    }
    json[:features] << {
      type: 'Feature',
      geometry: {
        type: 'Point',
        id: mural.id,
        coordinates: [mural.longitude, mural.latitude]
      }
    }
    json
  end

end
