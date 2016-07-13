angular.module('dankotuwa')

.factory('MapService', function() {

  var map;
  var currentPos;
  var shedMarkers;

  var o = {};

  o.draw = function(position, sheds, shedClickCallback) {
    if (position) {
      currentPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    } else {
      currentPos = new google.maps.LatLng(6.9327031, 79.843654);
    }

    var mapOptions = {
      center: currentPos,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
  ***REMOVED***

    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // Mark current pos
    google.maps.event.addListenerOnce(map, 'idle', function(){
      var marker = new google.maps.Marker({
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        map: map,
        animation: google.maps.Animation.DROP,
        position: currentPos
      });
    });

    // Mark sheds
    shedMarkers = sheds.map(function(shed) {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(shed.lat, shed.lng),
        map: map,
        icon: {
          path: MAP_PIN,
          fillColor: '#E67E22',
          fillOpacity: 1,
          strokeColor: '',
          strokeWeight: 0,
          scale: 0.8
        },
      });

      marker.addListener('click', function() {
        shedClickCallback(shed.id);
      });

      return {
        id: shed.id,
        marker: marker
    ***REMOVED***
    });

    return map;
***REMOVED***

  o.zoomToCurrentPos = function() {
    map.setZoom(15);
    map.panTo(currentPos);
***REMOVED***

  return o;
});
