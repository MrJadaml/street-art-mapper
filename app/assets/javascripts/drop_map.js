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
  var image = 'https://s3.amazonaws.com/streetheart/inactivepin.png';
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

  function radius(latlng) {
    var lat = latlng.D;
    var lng = latlng.k;

    // we'll want everything within, say, 150m distance
    var distance = .015;

    // earth's radius in km = ~6371
    var earth = 6371;

    // latitude boundaries
    var maxlat = lat + rad2deg(distance / earth);
    var minlat = lat - rad2deg(distance / earth);

    // longitude boundaries (longitude gets smaller when latitude increases)
    var maxlng = lng + rad2deg(distance / earth / Math.cos(deg2rad(lat)));
    var minlng = lng - rad2deg(distance / earth / Math.cos(deg2rad(lat)));
  };

  // Registering the event listener
  // New get request via AJAX to what route?
  // Look into sending query params w/ getJSON()
  // In 'data' controller on the server, check for params.
  // Given params, do x, else proceed as usual
  // Call new method on model that take max lat long (the ones you get from params)
  // respond w/ json per usual
};
