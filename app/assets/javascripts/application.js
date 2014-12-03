//= require jquery
//= require jquery_ujs
//= require bootstrap-sprockets
//= require_tree .

// var Streetmap = {
//   element: null,
//   mapOptions: {
//     zoom: 16,
//     center: myLatlng,
//     mapTypeId: google.maps.MapTypeId.ROADMAP,
//     scrollwheel: false
//   },
//   init: function() {
//     var self = this;
//     var map = new google.maps.Map(
//       document.getElementById(self.element), self.mapOptions
//     );
//     map.data.loadGeoJson('http://localhost:3009/murals.json');
//   }
// };
//
// Streetmap.elementId = element || document.getElementById('map-gallery');

$(document).ready(function() {




  // ---------------------------Mural #index--------------------------------------
  var galleryMap = function() {
    var myLatlng = new google.maps.LatLng(40.0172679,-105.2839094);

    var myOptions = {
      zoom: 16,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: false
    };

    var map = new google.maps.Map(
      document.getElementById('gallery-map'), myOptions
    );
    map.data.loadGeoJson('http://localhost:3009/murals.json');
  };

  // ---------------------------Mural #create--------------------------------------
  var dropMap = function() {
    var myLatlng = new google.maps.LatLng(40.0172679,-105.2839094);
    var myOptions = {
      zoom: 16,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(
      document.getElementById('new-map'), myOptions
    );

    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      draggable: true,
    });

    google.maps.event.addListener(marker, 'dragend', function (event) {
      document.getElementById('lat').value = event.latLng.lat();
      document.getElementById('long').value = event.latLng.lng();
    });
  }

  if (document.getElementById('gallery-map')) {
    galleryMap();
  } else {
    dropMap();
  }

  // if (document.getElementById('gallery-map')) {
  //   Streetmap.set('map-gallery');
  //   Streetmap.load();
  // } else {
  //   Streetmap.set('map-mural');
  //   Streetmap.load();
  // }


});
