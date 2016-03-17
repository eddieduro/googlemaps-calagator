var Class = require('./../js/class.js').Class;
var apiKey = require('./../.env').apiKey;
var meetUpApiKey = require('./../.env').meetUpApiKey;
var serverKey = require('./../.env').serverKey;


$( document ).ready(function() {
  defaultPosition();
  markersArray = [];
    var latitude = 45.5189614;
    var longitude = -122.6865243;
    $.ajax({
    type: "GET",
    dataType: 'JSONP',
    crossDomain: true,
    url: "https://api.meetup.com/find/groups?callback=?&key=" + meetUpApiKey +"&photo-host=public&lon=" + longitude + "&text=web development&lat=" + latitude + "&page=2&sign=true"
    }).then(function (response) {
      $.each(response, function (i, items) {
        console.log(i, items)
        var markers = defaultPosition(items);
        // $.each(items, function(j, item) {
        //   var nextEvent = item.next_event;
        //   if( nextEvent ){
        //     var eventId = item.next_event.id;
        //     // $.get("https://api.meetup.com/2/events?&sign=true&photo-host=public&event_id="+ eventId +"&page=20", function(data){
        //     //   console.log(data);
        //     // });
        //     $.ajax({
        //     type: "GET",
        //     dataType: 'JSONP',
        //     crossDomain: true,
        //     url: "https://api.meetup.com/2/events?&key="+ meetUpApiKey +"&sign=true&photo-host=public&event_id="+ eventId +"&page=20"
        //   }).then(function (k, data) {
        //      console.log(data.results[0].event_url);
        //   });
        // }
        // });
    });
  });
});
