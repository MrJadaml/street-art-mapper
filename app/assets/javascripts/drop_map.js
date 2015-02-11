var dropMap = function() {
  var myOptions = {
    zoom: 15,
    center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
    zoomControl: true,
    styles: mapStyle
  };

  var map = new google.maps.Map(
    document.querySelector('.new-map'), myOptions
  );

  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    draggable: true,
    icon: image
  });

  marker.setAnimation(google.maps.Animation.BOUNCE);
  setTimeout(function(){ marker.setAnimation(null); }, 3750);

  var infoWindow = new google.maps.InfoWindow({
    content: "Drag me!"
  });

  infoWindow.open(map, marker);
  google.maps.event.addListener(marker, 'dragstart', function() {
    infoWindow.close();
  });

  google.maps.event.addListener(marker, 'dragend', function (event) {
    document.getElementById('lat').value = event.latLng.lat();
    document.getElementById('long').value = event.latLng.lng();
  });

  $('.upload-btn').on('click', function() {
    $(this).hide();
  });

  $('.hidden').hide()

  function rad2deg(angle) {
    // Fomula from http://phpjs.org/functions/rad2deg/
    return angle / Math.PI * 180;
  }

  function deg2rad(angle) {
    // Fomula from http://phpjs.org/functions/deg2rad/
    return angle / 180 * Math.PI;
  }

  function radius() {
    var lat = parseFloat(document.getElementById('lat').value);
    var lng = parseFloat(document.getElementById('long').value);

    // Returns murals within 150m radius
    var distance = .15;

    // earth's radius in km = ~6371
    var earth = 6371;

    var bounds = {
      maxlat : lat + rad2deg(distance / earth),
      minlat : lat - rad2deg(distance / earth),
      maxlng : lng + rad2deg(distance / earth / Math.cos(deg2rad(lat))),
      minlng : lng - rad2deg(distance / earth / Math.cos(deg2rad(lat)))
    }
    return bounds
  };

  // Ajax call for murals within radius
  google.maps.event.addListener(marker, 'dragend', function (event) {
    $('.near-by').empty();
    $('.near-by').append('<div class="mural-group"></div>');
    $.getJSON( '/groups', radius(), function(data) {
      data.forEach(function (mural) {
        var dataId = "data-mural-id='" + mural.mural_id + "'",
            dataLat = "data-lat='" + mural.latitude + "'",
            dataLng = "data-lng='" + mural.longitude + "'",
            dataArtist = "data-artist-id='" + mural.artist_id + "'",
            dataBuff = "data-buff='" + mural.buffed + "'",
            classGMID =  " class='col-md-4 gallery-mural " + mural.mural_id,
            imgSrc = "<img src='" + mural.image + "'>",

            muralImg = "<div " + dataId + dataLat + dataLng + dataArtist + dataBuff + classGMID + "'>" + imgSrc + "</div>";
        $('.near-by').append(muralImg);
      });

      var addNew = '<div class="img-placeholder"><div class="dash-border"><div class="plus">+</div><div class="text">Add New</div></div></div>';
      $( '.near-by' ).append( addNew );

      $('.img-placeholder' ).on( 'click', function() {
        $( this ).siblings().fadeTo( 'fast' , 0.2);
        $( '.hide-me' ).show();
        $( '.gallery-mural' ).children('img').removeClass('highlight')
        $(this).attr( "data-latHolder", document.getElementById('lat').value );
        $(this).attr( "data-lngHolder", document.getElementById('long').value );
        $( '#mural_user_id' ).val("");
        $('#lat').val($( '.img-placeholder' ).data('latholder'));
        $('#long').val($( '.img-placeholder' ).data('lngholder'));
      });

      // Autofill form data on click event from ajax rendered images.
      $( '.gallery-mural' ).on( 'click', function() {
        $(this).fadeTo( 'slow', 1 ).siblings().fadeTo( 'slow' , 0.5);
        $( '.hide-me' ).hide();

        var muralId = $( this ).data( 'mural-id' ),
            artistId = $( this ).data('artist-id');

        // $( '.new_mural' ).append( '<input type="hidden" value="1" name="mural[group_id]" id="group_id">' ).val( muralId );
        debugger

        $( '#mural_ownerships_attributes_0_user_id' ).val( artistId );
        $( '#mural_images_attributes_0_mural_id' ).val( muralId );
        $( '#lat' ).val( $(this).data( 'lat' ));
        $( '#long' ).val( $(this).data( 'lng' ));
        $( '.gallery-mural' ).children('img').removeClass('highlight')
        $(this).children('img').addClass('highlight')
        $( '#mural_buffed' ).val( $(this).data( 'buff' ));
      });

      $( '.hide-me' ).on( 'click', function() {
        // $( '.gallery-mural' ).fadeTo( 'slow', 1 );
        $( '#mural_user_id' ).val( "" );
        $('#lat').val($( '.img-placeholder' ).data('latholder'));
        $('#long').val($( '.img-placeholder' ).data('lngholder'));
        $( '#mural_buffed' ).val( "false" );
      });
    });
  });
};
