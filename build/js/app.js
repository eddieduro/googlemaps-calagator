(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "AIzaSyBM-fE1aK6YGJwtHl-qWigReeLN0xWi7gs";
exports.meetUpApiKey = "30356ee382e4a3712b1642f673677";

},{}],2:[function(require,module,exports){
exports.Class = function(currentProperty, setProperty) {
  this.currentProperty = currentProperty;
  this.setProperty = setProperty;
};

exports.Class.prototype.triggerAlarm = function(currentProperty, setProperty) {
  if (currentProperty === setProperty) {
    return true;
  }
  else {
    return false;
  }
};

},{}],3:[function(require,module,exports){
var Class = require('./../js/class.js').Class;
var apiKey = require('./../.env').apiKey;

$( document ).ready(function() {
  
});

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

    infowindow = new google.maps.InfoWindow({
      content: description
    });

    var marker = new google.maps.Marker({
      map: mapObject,
      position: meetUpLatLong,
    });

    var contentString = description;
    markerArray.push(marker);
  }
  markerArray.forEach(function(marker){
    marker.addListener('click', function() {
      infowindow.open(mapObject, marker);
    });
  });

}

},{"./../.env":1,"./../js/class.js":2}]},{},[3]);
