 var profileMap = function(userPath) {

  var myOptions = {
    zoom: 15,
    center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: false,
    disableDefaultUI: true,
    zoomControl: true,
    styles: mapStyle
  };

  var map = new google.maps.Map(
    document.querySelector('.profile-map'), myOptions
  );

  $('.galleryImg').on('mouseover', activePin)
  $('.galleryImg').on('mouseout', inactivePin)

  window.markers = {};

  $.getJSON(userPath, function(data) {
    data.features.forEach(function(feature) {

      var muralId = feature.geometry.id

      var myLatlng = new google.maps.LatLng(
        feature.geometry.coordinates[1],
        feature.geometry.coordinates[0]
      );

      var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        icon: image,
        muralId: muralId,
      });

      window.markers[feature.geometry.id] = marker;

      var markerImage = '<IMG BORDER="0" ALIGN="Left" SRC=' + feature.geometry.image + '>'
      var thumbHighlight = '.' + (marker['muralId'].toString()) + '.galleryImg'
      var infowindow = new google.maps.InfoWindow({
        content: markerImage
      })

      google.maps.event.addListener(marker, 'mouseover', function() {
        $(thumbHighlight).addClass('highlight')
      });

      google.maps.event.addListener(marker, 'mouseout', function() {
        $(thumbHighlight).removeClass('highlight')
      });

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
      });
    });
  });
}
