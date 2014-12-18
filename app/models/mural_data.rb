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
          coordinates: [mural.longitude, mural.latitude]
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
          coordinates: [mural.longitude, mural.latitude]
        }
      }
    end

    json
  end

end
