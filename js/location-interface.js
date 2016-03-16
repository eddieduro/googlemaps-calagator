var Class = require('./../js/class.js').Class;
var apiKey = require('./../.env').apiKey;
var meetUpApiKey = require('./../.env').meetUpApiKey;

$( document ).ready(function() {
  $('#locateUser').click(locateUser, function() {
    var latitude = 45.5189614;
    var longitude = -122.6865243;
    $.get("https://api.meetup.com/2/cities?&sign=true&photo-host=public&lon=" + longitude + "&lat=" + latitude + "&page=1&key=" + meetUpApiKey).then(function(response) {
      console.log(response)
    });
  });
});

//google maps functions
function locateUser() {
  // If the browser supports the Geolocation API
  if (navigator.geolocation){
    var positionOptions = {
      enableHighAccuracy: true,
      timeout: 10 * 1000 // 10 seconds
    };
    navigator.geolocation.getCurrentPosition(geolocationSuccess, defaultPosition, positionOptions);
  }
  else {
    alert("Your browser doesn't support the Geolocation API");
  }
}

function geolocationSuccess(position) {

  var userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

  var myOptions = {
    zoom : 14,
    center : userLatLng,
    mapTypeId : google.maps.MapTypeId.ROADMAP
  };

  var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);
  // for loop
  new google.maps.Marker({
    map: mapObject,
    position: userLatLng
  });
  // end for
}

function defaultPosition() {
  var userLatLng = new google.maps.LatLng(45.5189614, -122.6865243);

  var myOptions = {
    zoom : 14,
    center : userLatLng,
    mapTypeId : google.maps.MapTypeId.ROADMAP
  };

  var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);

  new google.maps.Marker({
    map: mapObject,
    position: userLatLng
  });
}
