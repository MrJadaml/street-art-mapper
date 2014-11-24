// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
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


// If they are not on mobile, or deny your request to use their location,
// Then we want to give them an address field to tell us where the art is located...
// However, maybe on the backend we only want to store geocoords, so we take
// what they give us and convert it to populate the same form fields we
// would have otherwise with their geolocation enabled.

// a.geocode({ address: '1842 Canyon Blvd, Boulder CO'}, function(results, status) {
//  if (status === "OK") {
//    $('get that input').value('set it to results[0].geometry.location.K & B')
//  } else {
//    alert('That address didn't work.)
//  }
//});

  var getCoords = function() {
    navigator.geolocation.getCurrentPosition(function(geo) {
      // Grab input fields from view
      var latInput = $('input.lat');
      var longInput = $('input.long');

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




// lightbox http://teamtreehouse.com/library/jquery-basics/creating-a-simple-lightbox/perform-part-3
// var $overlay = $('<div id="overlay"></div>');
// var $image = $('<img>');
//
// $overlay.append($image);
//
// $("body").append($overlay);
//
// //can't create with a show page, needs to link straight to image url
// $("#muralGallery src").click(function(event){
//   event.preventDefault();
//   var imageLocation = $(this).attr("href");
//   $image.attr("src", imageLocation);
//
//   $overlay.show();

// });
