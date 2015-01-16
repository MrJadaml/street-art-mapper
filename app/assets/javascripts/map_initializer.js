var myLatlng = new google.maps.LatLng(39.7376845,-104.9836858);

function activePin(event) {
  var marker = window.markers[event.target.classList[1]];
  marker.setIcon('https://s3.amazonaws.com/streetheart/activepin.png');
}

function inactivePin(event){
  var marker = window.markers[event.target.classList[1]];
  marker.setIcon('https://s3.amazonaws.com/streetheart/inactivepin.png');
}

var image = 'https://s3.amazonaws.com/streetheart/inactivepin.png';

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
