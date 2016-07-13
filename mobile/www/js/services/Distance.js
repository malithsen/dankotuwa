angular.module('dankotuwa')

.factory('Distance', function(CurrentLocation) {

  var o = {};

  var distanceMatrix = new google.maps.DistanceMatrixService();

  o.get = function(locations, cb){
    return CurrentLocation.get().then(function(position){
      var start = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      locations.forEach(function(location){
        var dest = new google.maps.LatLng(parseFloat(location.lat), parseFloat(location.lng));
        getDistance(start, dest, function(distance, time){
          return cb(location.id, distance, time);
        });
      });
    });
***REMOVED***

  var getDistance = function(start, dest, cb) {
    distanceMatrix.getDistanceMatrix({
      origins: [start],
      destinations: [dest],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC
    }, function(response, status){
      var distance = response.rows[0].elements[0].distance.text;
      var time = response.rows[0].elements[0].duration.text;
      cb(distance, time);
    });

***REMOVED***
  return o;
});
