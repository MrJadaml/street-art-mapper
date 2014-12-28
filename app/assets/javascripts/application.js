//= require jquery
//= require jquery_ujs
//= require bootstrap-sprockets
//= require_tree .

$(document).ready(function() {

  window.MapFunctions = {

    galleryMap : function() {
      var myLatlng = new google.maps.LatLng(39.7502845,-104.9836858);

      var styles = [
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

      var myOptions = {
        zoom: 14,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        disableDefaultUI: true,
        zoomControl: true,
        styles: styles
      };

      map = new google.maps.Map(
        document.getElementById('gallery-map'), myOptions
      );

      $(".mapPin").on("mouseover", activePin)
      $(".mapPin").on("mouseout", regularPin)

      function activePin(event) {
        var id = event.target.parentElement.parentElement.classList[0];
        var marker = window.markers[id];
        marker.setIcon('http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=1|ffffff|c41200');
        $.each(window.markers, function () {

        });
      }

      function regularPin(event){
        var id = event.target.parentElement.parentElement.classList[0];
        var marker = window.markers[id];
        marker.setIcon('');
        $.each(window.markers, function () {
        });
      }

      window.markers = {};

      $.getJSON('/murals.json', function (data) {
        data.features.forEach(function (feature) {
          var myLatlng = new google.maps.LatLng(
            feature.geometry.coordinates[1],
            feature.geometry.coordinates[0]
          );
          var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
          });
          window.markers[feature.geometry.id] = marker;
        });
      });
    },

    profileMap : function(userPath) {
      var myLatlng = new google.maps.LatLng(39.7299566,-104.9836858);

      var styles = [
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

      var myOptions = {
        zoom: 15,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        disableDefaultUI: true,
        zoomControl: true,
        styles: styles
      };

      var map = new google.maps.Map(
        document.getElementById('profile-map'), myOptions
      );

      $('.mapPin').on('mouseover', activePin)
      $('.mapPin').on('mouseout', inactivePin)

      function activePin(event) {
        var id = event.target.parentElement.parentElement.classList[0];
        var marker = window.markers[id];
        marker.setIcon('http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=1|ffffff|c41200');
        $.each(window.markers, function() {

        });
      }

      function inactivePin(event) {
        var id = event.target.parentElement.parentElement.classList[0];
        var marker = window.markers[id];
        marker.setIcon('');
      };

      window.markers = {};

      $.getJSON(userPath, function(data) {
        data.features.forEach(function(feature) {
          var myLatlng = new google.maps.LatLng(
            feature.geometry.coordinates[1],
            feature.geometry.coordinates[0]
          );
          var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'Things and Stuff'
          });
          window.markers[feature.geometry.id] = marker;
        });
      });
    },

    dropMap : function() {
      var myLatlng = new google.maps.LatLng(39.7299566,-104.9836858);
      var myOptions = {
        zoom: 14,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        zoomControl: true
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
});
