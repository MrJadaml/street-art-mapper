//= require jquery
//= require jquery_ujs
//= require bootstrap-sprockets
//= require_tree .

// ---------------------------Mural #index--------------------------------------

function initialize() {
  var myLatlng = new google.maps.LatLng(40.0172679,-105.2839094);
  var myOptions = {
    zoom: 16,
    center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(
    document.getElementById('map'), myOptions
  );
  map.data.loadGeoJson('http://localhost:3009/murals.json');
};

google.maps.event.addDomListener(window, "load", initialize());

// ---------------------------Mural #create--------------------------------------

// function initialize() {
//   var myLatlng = new google.maps.LatLng(40.0172679,-105.2839094);
//   var myOptions = {
//     zoom: 16,
//     center: myLatlng,
//     mapTypeId: google.maps.MapTypeId.ROADMAP
//   };
//   var map = new google.maps.Map(
//     document.getElementById('new-mural-map'), myOptions
//   );
//
//   var marker = new google.maps.Marker({
//     position: myLatlng,
//     map: map,
//     draggable: true,
//   });
//
//   google.maps.event.addListener(marker, 'dragend', function (event) {
//     document.getElementById('lat').value = event.latLng.lat();
//     document.getElementById('long').value = event.latLng.lng();
//   });
// }
//
// google.maps.event.addDomListener(window, 'load', initialize());
