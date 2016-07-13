angular.module('dankotuwa')

.factory('CurrentLocation', function($cordovaGeolocation) {

  var o = {};

  o.get = function() {
    var options = {timeout: 10000, enableHighAccuracy: true};
    return $cordovaGeolocation.getCurrentPosition(options);
  };

  return o;
});
