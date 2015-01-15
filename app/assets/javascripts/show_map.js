var showMap = function(showPath) {

  window.markers = {};

  $.getJSON(showPath, function(data) {
    data.features.forEach(function(feature) {
      var myLatlng = new google.maps.LatLng(
        feature.geometry.coordinates[1],
        feature.geometry.coordinates[0]
      );

      var myOptions = {
        zoom: 15,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        zoomControl: true,
        styles: mapStyle
      };

      var map = new google.maps.Map(
        document.querySelector('.show-map'), myOptions
      );

      var image = 'https://s3.amazonaws.com/streetheart/inactivepin.png';
      var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        icon: image
      });
      window.markers[feature.geometry.id] = marker;
    });
  });
}
