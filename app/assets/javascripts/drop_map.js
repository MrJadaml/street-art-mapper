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

  google.maps.event.addListener(marker, 'dragend', function (event) {
    document.getElementById('lat').value = event.latLng.lat();
    document.getElementById('long').value = event.latLng.lng();
  });

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

    // we'll want everything within, say, 150m distance
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
      data.forEach(function (x) {
        var dataId = "data-mural-id='" + x.id + "'",
            dataLat = "data-lat='" + x.latitude + "'",
            dataLng = "data-lng='" + x.longitude + "'",
            dataArtist = "data-artist-id='" + x.user_id + "'",
            dataBuff = "data-buff='" + x.buffed + "'",
            classGMID =  " class='col-md-4 gallery-mural " + x.id,
            imgSrc = "<img src='" + x.image.user_ablum.url + "'>",
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
        $('#lat').val($( '.img-placeholder' ).data('latholder'));
        $('#long').val($( '.img-placeholder' ).data('lngholder'));
      });

      // Autofill form data on click event from ajax rendered images.
      $( '.gallery-mural' ).on( 'click', function() {
        var muralId = $( this ).data( 'mural-id' ),
            artist = $( this ).data('artist-id');
        $(this).fadeTo( 'slow', 1 ).siblings().fadeTo( 'slow' , 0.5);
        $( '.hide-me' ).hide();
        $( '.new_mural' ).append( '<input type="hidden" value="1" name="mural[group_id]" id="group_id">' ).val( muralId );
        $( '#mural_user_id' ).val( artist );
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
