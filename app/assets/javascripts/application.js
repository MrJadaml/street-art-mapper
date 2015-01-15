//= require jquery
//= require jquery_ujs
//= require bootstrap-sprockets
//= require_tree .

$(document).ready(function() {
  var mapStyle = [
    {
      "featureType": "administrative",
      "elementType": "labels.text.fill",
      "stylers": [
      {
        "color": "#444444"
      }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "all",
      "stylers": [
      {
        "color": "#f2f2f2"
      }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "all",
      "stylers": [
      {
        "visibility": "off"
      }
      ]
    },
    {
      "featureType": "poi.attraction",
      "elementType": "all",
      "stylers": [
      {
        "visibility": "on"
      },
      {
        "hue": "#00f3ff"
      },
      {
        "saturation": "20"
      },
      {
        "lightness": "25"
      }
      ]
    },
    {
      "featureType": "poi.attraction",
      "elementType": "labels.icon",
      "stylers": [
      {
        "visibility": "simplified"
      },
      {
        "hue": "#0015ff"
      }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "all",
      "stylers": [
      {
        "visibility": "on"
      },
      {
        "color": "#00ffa7"
      },
      {
        "saturation": "50"
      },
      {
        "lightness": "-10"
      },
      {
        "gamma": "1.50"
      },
      {
        "weight": "0.01"
      }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
      {
        "hue": "#00ff97"
      },
      {
        "lightness": "29"
      },
      {
        "saturation": "8"
      }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text",
      "stylers": [
      {
        "hue": "#6700ff"
      }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.icon",
      "stylers": [
      {
        "visibility": "simplified"
      },
      {
        "gamma": "1.25"
      },
      {
        "lightness": "12"
      },
      {
        "color": "#ffec36"
      }
      ]
    },
    {
      "featureType": "road",
      "elementType": "all",
      "stylers": [
      {
        "saturation": -100
      },
      {
        "lightness": 45
      }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "all",
      "stylers": [
      {
        "visibility": "simplified"
      }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.icon",
      "stylers": [
      {
        "visibility": "off"
      }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "all",
      "stylers": [
      {
        "visibility": "off"
      }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "all",
      "stylers": [
      {
        "hue": "#ff005c"
      }
      ]
    },
    {
      "featureType": "transit.station.bus",
      "elementType": "all",
      "stylers": [
      {
        "visibility": "on"
      },
      {
        "hue": "#a400ff"
      }
      ]
    },
    {
      "featureType": "transit.station.rail",
      "elementType": "all",
      "stylers": [
      {
        "visibility": "on"
      },
      {
        "hue": "#ff9a00"
      },
      {
        "saturation": "49"
      },
      {
        "gamma": "0.75"
      }
      ]
    },
    {
      "featureType": "water",
      "elementType": "all",
      "stylers": [
      {
        "color": "#46bcec"
      },
      {
        "visibility": "on"
      }
      ]
    }
  ];

  function activePin(event) {
    var marker = window.markers[event.target.classList[1]];
    marker.setIcon('https://s3.amazonaws.com/streetheart/activepin.png');
    $.each(window.markers, function() {});
  }

  function inactivePin(event){
    var marker = window.markers[event.target.classList[1]];
    marker.setIcon('https://s3.amazonaws.com/streetheart/inactivepin.png');
    $.each(window.markers, function() {});
  }
  var myLatlng = new google.maps.LatLng(39.7376845,-104.9836858);

  window.MapFunctions = {

    galleryMap : function() {

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

      $('.mapPin').on('mouseover', activePin)
      $('.mapPin').on('mouseout', inactivePin)

      window.markers = {};
      $.getJSON('/data', function (data) {
        data.features.forEach(function (feature) {
          var muralId = feature.geometry.id
          var myLatlng = new google.maps.LatLng(
            feature.geometry.coordinates[1],
            feature.geometry.coordinates[0]
          );
          var image = 'https://s3.amazonaws.com/streetheart/inactivepin.png';
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

          var thumbHighlight = '.' + (marker['muralId'].toString()) + '.mapPin'
          var addHighlight = function() {
            $(thumbHighlight).addClass('highlight');
          };
          var removeHighlight = function() {
            $(thumbHighlight).removeClass('highlight');
          };
          var markerWindow = function() {
            infowindow.open(map,marker);
          };

          google.maps.event.addListener(marker, 'mouseover', addHighlight);
          google.maps.event.addListener(marker, 'mouseout', removeHighlight);
          google.maps.event.addListener(marker, 'click', markerWindow);
        });
      });
    },

    profileMap : function(userPath) {

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

      $('.mapPin').on('mouseover', activePin)
      $('.mapPin').on('mouseout', inactivePin)

      window.markers = {};

      $.getJSON(userPath, function(data) {
        data.features.forEach(function(feature) {
          var muralId = feature.geometry.id
          var myLatlng = new google.maps.LatLng(
            feature.geometry.coordinates[1],
            feature.geometry.coordinates[0]
          );
          var image = 'https://s3.amazonaws.com/streetheart/inactivepin.png';
          var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            icon: image,
            muralId: muralId,
          });
          window.markers[feature.geometry.id] = marker;

          var markerImage = '<IMG BORDER="0" ALIGN="Left" SRC=' + feature.geometry.image + '>'
          var thumbHighlight = '.' + (marker['muralId'].toString()) + '.mapPin'
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
    },

    showMap : function(showPath) {


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
    },

    dropMap : function() {
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
    }
  }
});
