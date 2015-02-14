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
            classGMID =  " class='col-md-4 gallery-mural " + mural.mural_id,
            imgSrc = "<img src='" + mural.image + "'>",

            muralImg = "<div " + dataId + dataLat + dataLng + dataArtist + classGMID + "'>" + imgSrc + "</div>";
        $('.near-by').append(muralImg);
      });

      // "Add Image" gallery icon
      var addNewIcon = '<div class="add-new-icon"><div class="dash-border"><div class="plus">+</div><div class="text">Add New</div></div></div>';
      $( '.near-by' ).append( addNewIcon );

      // When "Add Image" clicked, fade images and populate Artist list drop down.
      $('.add-new-icon' ).on( 'click', function() {
        $( this ).siblings().fadeTo( 'fast' , 0.2);
        $( '.hide-me' ).show();
        $( '.gallery-mural' ).children('img').removeClass('highlight')

        // Get Lat & Lng from marker
        $(this).attr( "data-latHolder", document.getElementById('lat').value );
        $(this).attr( "data-lngHolder", document.getElementById('long').value );

        // This is doing nothing right now
        $( '#mural_user_id' ).val("");

        // Pushes Lat & Lng from ajax images to form_for
        $('#lat').val($( '.add-new-icon' ).data('latholder'));
        $('#long').val($( '.add-new-icon' ).data('lngholder'));
      });

      // Autofill form_for data on click of ajax images.
      $( '.gallery-mural' ).on( 'click', function() {
        var muralId = $( this ).data( 'mural-id' ),
            artistId = $( this ).data('artist-id'),
            $artistSelect = $( '#image_ownerships_user_id' ),
            $imageMuralIdField = $( '#image-mural-id' ),
            $muralLat = $(this).data( 'lat' ),
            $muralLng = $(this).data( 'lng' ),
            $latField = $( '#lat' ),
            $lngField = $( '#long' );

        $artistSelect.val( artistId );
        $imageMuralIdField.val( muralId );
        $latField.val( $muralLat );
        $lngField.val( $muralLng);

        $(this).fadeTo( 'slow', 1 ).siblings().fadeTo( 'slow' , 0.5);
        $( '.hide-me' ).hide();
        $( '.gallery-mural' ).children('img').removeClass('highlight');
        $(this).children('img').addClass('highlight');
      });

      // Ownership form-group click - reset data action
      $( '.hide-me' ).on( 'click', function() {
        var $markerLat = $( '.add-new-icon' ).data('latholder'),
            $markerLng = $( '.add-new-icon' ).data('lngholder'),
            // $ownerMuralIdField = $( '#owner-mural-id' ),
            $imageMuralIdField = $( '#image-mural-id' ),
            $latField = $( '#lat' ),
            $lngField = $( '#long' );

     // $( '.gallery-mural' ).fadeTo( 'slow', 1 );
        // $ownerMuralIdField.val("");
        $imageMuralIdField.val("");
        $latField.val( $markerLat );
        $latField.val( $markerLng );
      });
    });
  });
};

// What actually needs to be set:

// Image :mural_id $( '#image-mural-id' )
//
// Ownership :mural_id -> $( '#owner-mural-id' )
// Ownership :user_id -> $( '#image_ownerships_user_id' ) //AKA artist_id
//
// Mural :latitude -> $( '#lat' )
// Mural :latitude -> $( '#long' )
