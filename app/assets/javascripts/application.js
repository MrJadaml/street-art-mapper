//= require jquery
//= require jquery_ujs
//= require bootstrap-sprockets
//= require_tree .

$(document).ready(function() {

  window.MapFunctions = {

    galleryMap : function() {
      var myLatlng = new google.maps.LatLng(39.7502845,-104.9836858);

      var myOptions = {
        zoom: 14,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        disableDefaultUI: true,
        zoomControl: true
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

      var myOptions = {
        zoom: 15,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        disableDefaultUI: true,
        zoomControl: true
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
