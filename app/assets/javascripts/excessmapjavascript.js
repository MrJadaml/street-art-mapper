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









[
  {
    "type":"Point",
    "coordinates":[-105.196297724738,39.9935339839196]
  },
  {
    "type":"Point",
    "coordinates":[-105.283136923804,40.0162490232761]
  }
]




{
  "type": "FeatureCollection",
  "features": [
  {
    "type": "Feature",
    "properties": {
      "letter": "G",
      "color": "blue",
      "rank": "7",
      "ascii": "71"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
      [
      [123.61, -22.14], [122.38, -21.73], [121.06, -21.69], [119.66, -22.22], [119.00, -23.40],
      ]
      ]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "letter": "o",
      "color": "red",
      "rank": "15",
      "ascii": "111"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
      [
      [128.84, -25.76], [128.18, -25.60], [127.96, -25.52], [127.88, -25.52], [127.70, -25.60],
      ],
      [
      [128.45, -27.44], [128.32, -26.94], [127.70, -26.82], [127.35, -27.05], [127.17, -27.80],
      ]
      ]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "letter": "o",
      "color": "yellow",
      "rank": "15",
      "ascii": "111"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
      [
      [131.87, -25.76], [131.35, -26.07], [130.95, -26.78], [130.82, -27.64], [130.86, -28.53],
      ],
      [
      [133.15, -27.17], [132.71, -26.86], [132.09, -26.90], [131.74, -27.56], [131.79, -28.26],
      ]
      ]
    }
  },
