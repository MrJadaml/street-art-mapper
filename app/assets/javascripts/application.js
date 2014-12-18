//= require jquery
//= require jquery_ujs
//= require bootstrap-sprockets
//= require_tree .

$(document).ready(function() {

  window.MapFunctions = {

    galleryMap : function() {
      var myLatlng = new google.maps.LatLng(40.0172679,-105.2839094);

      var myOptions = {
        zoom: 15,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false
      };

      var map = new google.maps.Map(
        document.getElementById('gallery-map'), myOptions
      );
      map.data.loadGeoJson('/murals.json');
    },

    profileMap : function(userPath) {
      var myLatlng = new google.maps.LatLng(40.0172679,-105.2839094);

      var myOptions = {
        zoom: 15,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false
      };

      var map = new google.maps.Map(
        document.getElementById('profile-map'), myOptions
      );

      var array = window.location.href.split("/");
      var id = array[array.length - 1];

      map.data.loadGeoJson(userPath);
    },

    dropMap : function() {
      var myLatlng = new google.maps.LatLng(40.0172679,-105.2839094);
      var myOptions = {
        zoom: 15,
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

  }

  // if (document.getElementById('gallery-map')) {
  //   Streetmap.set('map-gallery');
  //   Streetmap.load();
  // } else {
  //   Streetmap.set('map-mural');
  //   Streetmap.load();
  // }

});


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
