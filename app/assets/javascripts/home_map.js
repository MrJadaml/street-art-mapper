var homeMap = function() {
  var myLatlng = new google.maps.LatLng(39.7376845,-104.9836858);

  var myOptions = {
    zoom: 14,
    center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: false,
    disableDefaultUI: true,
    zoomControl: true,
    styles: mapStyle
  };

  map = new google.maps.Map(
    document.querySelector('.gallery-map'), myOptions
  );

  $('.galleryImg').on('mouseover', activePin)
  $('.galleryImg').on('mouseout', inactivePin)

  window.markers = {};
  $.getJSON('/data', function (data) {
    data.features.forEach(function (feature) {

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
      window.markers[muralId] = marker;

      var markerImage = '<IMG BORDER="0" ALIGN="Left" SRC=' + feature.geometry.image + '>'
      var infowindow = new google.maps.InfoWindow({
        content: markerImage
      })

      var thumbHighlight = '.' + (marker['muralId'].toString()) + '.galleryImg'
      var addHighlight = function() {
        $(thumbHighlight).parents('.gallery-mural').siblings().clearQueue().fadeTo( 'fast' , 0.2);
      };
      var removeHighlight = function() {
        $(thumbHighlight).parents().eq(2).children().fadeTo( 'fast', 1 )
      };
      var markerWindow = function() {
        infowindow.open(map, marker);
      };

      google.maps.event.addListener(marker, 'mouseover', addHighlight);
      google.maps.event.addListener(marker, 'mouseout', removeHighlight);
      google.maps.event.addListener(marker, 'click', markerWindow);
    });
  });
}
