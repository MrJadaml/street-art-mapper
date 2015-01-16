var dropMap = function() {
  var myOptions = {
    zoom: 14,
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
  // The maths are off
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

    // Boundaries (longitude gets smaller when latitude increases)
    var bounds = {
      maxlat : lat + rad2deg(distance / earth),
      minlat : lat - rad2deg(distance / earth),
      maxlng : lng + rad2deg(distance / earth / Math.cos(deg2rad(lat))),
      minlng : lng - rad2deg(distance / earth / Math.cos(deg2rad(lat)))
    }
    return bounds
  };

  google.maps.event.addListener(marker, 'dragend', function (event) {
    $('.gallery').empty();
    $('.gallery').append('<div class="mural-group"></div>');
    $.getJSON( "/groups", radius(), function(data) {
      data.forEach(function (x) {
        var muralImg = "<div data-mural-id='" + x.id + "' class='col-md-4 gallery-mural " + x.id + "'><img src='" + x.image.user_ablum.url + "'></div>";
        $('.gallery').append(muralImg);
      });
      $( '.gallery-mural' ).on( 'click', function() {
        var muralId = $( this ).data( 'mural-id' );
        $( '.new_mural' ).append( '<input type="hidden" value="1" name="mural[group_id]" id="group_id">' ).val( muralId );
        $( '#mural_user_id' ).val( 43 );
        $( '#lat' ).val( "clicked mural lat value" );
        $( '#long' ).val( "clicked mural lng value" );
        $( '#mural_buffed' ).val( 0 );
      });
    });
  });

  //
  // <form class="new_mural" id="new_mural" enctype="multipart/form-data" action="/murals" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="✓"><input type="hidden" name="authenticity_token" value="9jB9T9qSFxPNJdHwFAXCQ+slBVhjNHhxCWFmnxMfl0JfivLYJHK9PrUIGykJUuiH+IPOdfTjFEKFJ2p4DiRssQ==">  <div class="form-group">
  //
  // <select class="form-control" name="mural[user_id]" id="mural_user_id"><option value="">Pick an artist</option>
  // <option value="49">Keno Gonzales</option>
  // <option value="43">Cannon Dill</option>
  // <option value="4">Loyal</option>
  //
  // <input id="lat" class="form-control" type="hidden" name="mural[latitude]" value="39.747980045883544">
  // <input id="long" class="form-control" type="hidden" name="mural[longitude]" value="-104.98282749311522">
  //
  // <input name="mural[buffed]" type="hidden" value="0">
  // <input type="hidden" value="1" name="mural[group_id]" id="group_id">
  //







  // Click on pop-up image will work like a 'Submit'
  // The click 'Submit' will envoke a confirmation of intention.
  // Params taken from pop-up => :group_id, :artist(s), :latitude, :longitude, :buffed
  // Params taken from user => :image, :user_id, :created_at :updated_at
  // Generate a POST request with all the above params


  // $(this).data('mural-id'))
  // form .append(data fields)

};
