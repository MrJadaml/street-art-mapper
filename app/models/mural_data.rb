class MuralData
  def mural_form(params)
    mural_group = Group.find(params['group_id'])
    {
      lat: mural_group.latitude,
      lng: mural_group.longitude,
      artists: mural_group.artists,
      buffed: mural_group.buffed
    }
  end

  def gallery_data
    { type: "FeatureCollection",
      features: Mural.all.map { |mural| mural.as_gallery_data } }
  end

  def profile_data(user_id)
    json = {}

    images = User.find(user_id).images
    json = {
      type: "FeatureCollection",
      features: []
    }
    images.each do |image|
      json[:features] << {
        type: 'Feature',
        geometry: {
          type: 'Point',
          id: image.mural_id,
          coordinates: [image.mural.longitude, image.mural.latitude],
          image: image.source.url(:thumb)
        }
      }
    end
    json
  end

  def artist_data(user_id)
    { type: "FeatureCollection",
      features: User.find(user_id).murals.map { |mural| mural.as_artist_data } }
  end

  # def show_data(mural_id)
  #   { type: "FeatureCollection",
  #     features: Mural.find(mural_id).as_show_data }
  # end

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

    near_by_murals = Mural.where(latitude: minlat..maxlat).where(longitude: minlng..maxlng)
    near_by_murals.map { |mural| mural.to_hash }
  end
end
