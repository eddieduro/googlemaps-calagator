var Class = require('./../js/class.js').Class;
var apiKey = require('./../.env').apiKey;
var meetUpApiKey = require('./../.env').meetUpApiKey;

$( document ).ready(function() {
  defaultPosition();
  markersArray = [];
    var latitude = 45.5189614;
    var longitude = -122.6865243;
    $.ajax({
    type: "GET",
    dataType: 'JSONP',
    crossDomain: true,
    url: "https://api.meetup.com/find/groups?callback=?&key=" + meetUpApiKey +"&photo-host=public&lon=" + longitude + "&text=web development&lat=" + latitude + "&page=20&sign=true"
    }).then(function (response) {
      $.each(response, function (i, items) {
        var markers = defaultPosition(items);
        // markers.forEach(function(marker){
        //   addInfoWindow(marker);
        // });
    });

  });
});

function defaultPosition(arr = []) {
  var userLatLng = new google.maps.LatLng(45.5189614, -122.6865243);
  var markerArray = [];
  var infoArray = [];
  var contentArray = [];
  var marker = "";
  var infowindow = "";
  var myOptions = {
    zoom : 14,
    center : userLatLng,
    mapTypeId : google.maps.MapTypeId.ROADMAP
  };
  var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);
  for(i = 0; i < arr.length; i++){
    var meetUpLatLong = new google.maps.LatLng(arr[i].lat, arr[i].lon);
    var name = arr[i].name;
    var description = arr[i].description;
    var link = arr[i].link;
    var next_event = arr[i].next_event;

    if( next_event !== undefined){
      var id = next_event.id;
    }
    marker = new google.maps.Marker({
      map: mapObject,
      position: meetUpLatLong,
    });

    infowindow = new google.maps.InfoWindow({
      content: description
    });

    marker.addListener('click', function() {
      infowindow.open(mapObject, marker);
    });

    var contentString = description;
    markerArray.push(marker);
    infoArray.push(infowindow);
  }


  console.log(contentArray);
  infoArray.forEach(function(info){
    contentArray.push(info.content);
  });
  markerArray.forEach(function(marker, i){
    marker.addListener('click', function() {
      infowindow.setContent(contentArray[i]);
      infowindow.open(mapObject, marker);
    });

  });

}
