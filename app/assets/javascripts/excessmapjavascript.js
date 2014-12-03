// // need an address attribute for string input and need lat/log attributes for
// // automated geolocation.
//
// (function(document,window,google, $) {
//
//   $('.add-location').on('click', function() {
//     getCoords();
//   });
//
//   var HeartMap = {
//     specs: {
//       zoom: 16
//     },
//     getMapElement: function() {
//       HeartMap.element = document.getElementById('map')
//     },
//     populateMap: function() {
//       var map = new google.maps.Map(
//         HeartMap.element,
//         HeartMap.specs
//       )
//     }
//   }
//
//
//   var getCoords = function() {
//     navigator.geolocation.getCurrentPosition(function(geo) {
//       // Grab input fields from view
//       var latInput = $('input.lat');
//       var longInput = $('input.long');
//       console.log(latInput)
//       console.log(longInput)
//
//       // Add geolocation coords from navigator
//       latInput.val(geo.coords.latitude);
//       longInput.val(geo.coords.longitude);
//
//       if (latInput.val() && longInput.val()) {
//         alert('Location Added!');
//       }
//     });
//   }
//
//   navigator.geolocation.getCurrentPosition(function(geo) {
//     HeartMap.specs.center = new google.maps.LatLng(
//       geo.coords.latitude,
//       geo.coords.longitude
//     )
//     HeartMap.getMapElement()
//     HeartMap.populateMap()
//   })
// })(document, window, google, jQuery)
