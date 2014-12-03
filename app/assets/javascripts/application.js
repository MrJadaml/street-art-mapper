//= require jquery
//= require jquery_ujs
//= require bootstrap-sprockets
//= require_tree .

// need an address attribute for string input and need lat/log attributes for
// automated geolocation.

(function(document,window,google, $) {

  $('.add-location').on('click', function() {
    getCoords();
  });

  var HeartMap = {
    specs: {
      zoom: 16
    },
    getMapElement: function() {
      HeartMap.element = document.getElementById('map')
    },
    populateMap: function() {
      var map = new google.maps.Map(
        HeartMap.element,
        HeartMap.specs
      )
    }
  }


  var getCoords = function() {
    navigator.geolocation.getCurrentPosition(function(geo) {
      // Grab input fields from view
      var latInput = $('input.lat');
      var longInput = $('input.long');
      console.log(latInput)
      console.log(longInput)

      // Add geolocation coords from navigator
      latInput.val(geo.coords.latitude);
      longInput.val(geo.coords.longitude);

      if (latInput.val() && longInput.val()) {
        alert('Location Added!');
      }
    });
  }

  navigator.geolocation.getCurrentPosition(function(geo) {
    HeartMap.specs.center = new google.maps.LatLng(
      geo.coords.latitude,
      geo.coords.longitude
    )
    HeartMap.getMapElement()
    HeartMap.populateMap()
  })
})(document, window, google, jQuery)


// ---------------------------------------------------------------------------------------------

function initialize() {
  var myLatlng = new google.maps.LatLng(40.0172679,-105.2839094);
  var myOptions = {
    zoom: 16,
    center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(
    document.getElementById('new-mural-map'), myOptions
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

google.maps.event.addDomListener(window, 'load', initialize());
