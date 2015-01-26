class MuralData
  def mural_form(params)
    mural_group = Group.find(params['group_id'])
    json = {
      lat: mural_group.latitude,
      lng: mural_group.longitude,
      artists: mural_group.artists,
      buffed: mural_group.buffed
    }
  end

  def gallery_data
    images = Image.all
    json = {
      type: "FeatureCollection",
      features: []
    }
    images.each do |image|
      json[:features] << {
        type: 'Feature',
        geometry: {
          type: 'Point',
          id: image.id,
          coordinates: [mural.longitude, mural.latitude],
          image: image.image.url(:thumb)
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

  def group_data(params)
    minlat = params['minlat'].to_f
    maxlat = params['maxlat'].to_f

    minlng = params['minlng'].to_f
    maxlng = params['maxlng'].to_f

    @murals = Mural.where(latitude: minlat..maxlat).where(longitude: minlng..maxlng)
  end
end
