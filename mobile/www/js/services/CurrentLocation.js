angular.module('dankotuwa')

.factory('CurrentLocation', function($rootScope, $q, $cordovaGeolocation, $ionicPopup) {

  var o = {};

  var currPosition;

  o.get = function() {
    var deferred = $q.defer();
    var retries = 0;

    var checkCacheAvailability = function() {
      // Alert user on location error
      $ionicPopup.alert({
        title: 'Location Error',
        template: 'You will be re-directed to the default location. Please check whether your data and location services are enabled.'
      });

      if (localStorage.getItem("lastLocation") !== null) {
        currPosition = {coords: JSON.parse(localStorage.getItem('lastLocation'))};
        return deferred.resolve(currPosition);
      }
      else {
        // If geolocating attempts fail and the cache is empty
        return deferred.reject(err);
      }
    }

    var tryGetLocation = function() {
      // Try to get location. High accuracy is enabled only during the first try
      $cordovaGeolocation.getCurrentPosition({
        timeout: 3000,
        enableHighAccuracy: retries === 0
      }).then(function(geoPosition) {
        currPosition = geoPosition;
        var cacheObject = {'latitude': currPosition.coords.latitude, 'longitude': currPosition.coords.longitude};
        localStorage.setItem('lastLocation', JSON.stringify(cacheObject));
        // Resolve promise on success
        return deferred.resolve(geoPosition);
      }, function(err) {
        // If retry count is <2, then retry
        if (retries < 2) {
          retries++;
          tryGetLocation();
        } else if(navigator.geolocation){
          // Fallback to html5 geolocation api

          navigator.geolocation.getCurrentPosition(function(position){
            currPosition = {'latitude': position.coords.latitude, 'longitude': position.coords.longitude };
            localStorage.setItem("lastLocation", JSON.stringify(currPosition));
            return deferred.resolve(position);
          }, function(err){
            checkCacheAvailability();
          }, {
            timeout: 3000
          });
        } else {
            checkCacheAvailability();
          }
      });
    };

    var errorCb = function(err) {
      checkCacheAvailability();
    };

    if (window.cordova && window.cordova.plugins.locationAccuracy) {
      var ACCURACY = cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY;
      cordova.plugins.locationAccuracy.request(tryGetLocation, errorCb, ACCURACY);
    } else {
      tryGetLocation();
    }


    return deferred.promise;
  };

  return o;
});
