var Class = require('./../js/class.js').Class;
var apiKey = require('./../.env').apiKey;
var meetUpApiKey = require('./../.env').meetUpApiKey;
var serverKey = require('./../.env').serverKey;


$( document ).ready(function() {
  defaultPosition();
  markersArray = [];
  eventArray = [];
    var latitude = 45.5189614;
    var longitude = -122.6865243;
    $.ajax({
    type: "GET",
    dataType: 'JSONP',
    crossDomain: true,
    url: "https://api.meetup.com/find/groups?callback=?&key=" + meetUpApiKey +"&photo-host=public&lon=" + longitude + "&text=web development&lat=" + latitude + "&page=2&sign=true"
    }).then(function (response) {
      $.each(response, function (i, items) {
        // console.log(i, items)
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
            url: "https://api.meetup.com/2/events?&key="+ meetUpApiKey +"&sign=true&photo-host=public&event_id="+ eventId +"&page=2"
          }).then(function (data) {
            var event_url = data.results[0].event_url;
            var eventName = data.results[0].name;
            var eventAddress = data.results[0].venue.address_1;
            var eventCity = data.results[0].venue.city;
            var eventState = data.results[0].venue.state;
            var eventLat = data.results[0].venue.lat;
            var eventLon = data.results[0].venue.lon;
            console.log(data);
            // $.each(data, function(k, log) {
            //   var eventAddress =
            //   console.log(log);
            // })
            $("#current").append("<h4>"+ eventName + "</h4><p>" + eventAddress + " " + eventCity + ", " + eventState + "<li><a target='_blank' href='"+ event_url +"'>" + event_url + "</li>");
          });
        }
        });
    });
  });
});
