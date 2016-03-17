var Class = require('./../js/class.js').Class;
var apiKey = require('./../.env').apiKey;
var meetUpApiKey = require('./../.env').meetUpApiKey;
var serverKey = require('./../.env').serverKey;

$(document).ajaxStart(function(){
    $(".loader").css("display", "block");
});



$( document ).ready(function() {
  $('#loading-image').show();
  defaultPosition();
  markersArray = [];
  eventArray = [];
    var latitude = 45.5189614;
    var longitude = -122.6865243;
    $.ajax({
    type: "GET",
    dataType: 'JSONP',
    crossDomain: true,
    url: "https://api.meetup.com/find/groups?callback=?&key=" + meetUpApiKey +"&photo-host=public&lon=" + longitude + "&text=web development&lat=" + latitude + "&page=8&sign=true"
    }).then(function (response) {
      $.each(response, function (i, items) {
        console.log(i, items)
        var markers = defaultPosition(items);
        $.each(items, function(j, item) {
          // console.log(item);
          var nextEvent = item.next_event;
          if( nextEvent ){
            var eventId = item.next_event.id;
            $.ajax({
            type: "GET",
            dataType: 'JSONP',
            crossDomain: true,
            url: "https://api.meetup.com/2/events?&key="+ meetUpApiKey +"&sign=true&photo-host=public&event_id="+ eventId +"&page=8"
          }).then(function (data) {
            var event_url = data.results[0].event_url;
            var eventName = data.results[0].name;
            var eventAddress = data.results[0].venue.address_1;
            var eventCity = data.results[0].venue.city;
            var eventState = data.results[0].venue.state;
            var eventLat = data.results[0].venue.lat;
            var eventLon = data.results[0].venue.lon;
            console.log(data);
            $("#current").append("<h4>"+ eventName + "</h4><p>" + eventAddress + " " + eventCity + ", " + eventState + "<li><a target='_blank' href='"+ event_url +"'>" + event_url + "</li>");
          });
        }
        });
    });
  });
});

$(document).ajaxComplete(function(){
    $(".loader").css("display", "none");
});

var Class = require('./../js/class.js').Class;
var apiKey = require('./../.env').apiKey;
var meetUpApiKey = require('./../.env').meetUpApiKey;
var serverKey = require('./../.env').serverKey;


function defaultPosition(arr = []) {
  var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="

  // https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY
  var userLatLng = new google.maps.LatLng(45.5189614, -122.6865243);
  var markerArray = [];
  var infoArray = [];
  var addressArray = [];
  var contentArray = [];
  var latlongArray = [];
  var marker = "";
  var infowindow = "";
  var myOptions = {
    zoom : 14,
    center : userLatLng,
    mapTypeId : google.maps.MapTypeId.ROADMAP
  };
  var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);
  for(i = 0; i < arr.length; i++){
    // console.log(arr[i])
    var newUrl = url + arr[i].lat + ', ' + arr[i].lon + "&key=" + serverKey;
    var meetUpLatLong = new google.maps.LatLng(arr[i].lat, arr[i].lon);
    var name = arr[i].name;
    var description = arr[i].description;
    var link = arr[i].link;
    var next_event = arr[i].next_event;
    // if( next_event !== undefined){
    //   var id = next_event.id;
    //   // $.get("https://api.meetup.com/2/events?&sign=true&photo-host=public&event_id="+ id +"&page=20")
    // }
    var group_photo = arr[i].group_photo;
    if( group_photo ){
      var thumb_link = group_photo.thumb_link;
      // console.log(thumb_link)
    }
    // console.log(arr[i]);
    marker = new google.maps.Marker({
      map: mapObject,
      position: meetUpLatLong,
    });
    infowindow = new google.maps.InfoWindow({
      content: "<img id='thumb_nail_img' src='" + thumb_link + "'><h2>"+ name + "</h2><br/><a href='" + link + "'>" + link + "</a><br/>" + description
    });
    marker.addListener('click', function() {
      infowindow.open(mapObject, marker);
    });
    var contentString = description;
    markerArray.push(marker);
    infoArray.push(infowindow);
    latlongArray.push(newUrl)
  }
  // console.log(latlongArray);
  infoArray.forEach(function(info){
    contentArray.push(info.content);
  });
  markerArray.forEach(function(marker, i){
    marker.addListener('click', function() {
      $.get(latlongArray[i], function(response){
        var address = response.results[0].formatted_address;

        addressArray.unshift(address);
      });
      // console.log(addressArray[0]);

      infowindow.setContent(contentArray[i] + "<br/>" +addressArray[0]);
      infowindow.open(mapObject, marker);
    });
  });
}
