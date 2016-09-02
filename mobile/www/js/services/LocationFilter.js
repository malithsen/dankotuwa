angular.module('dankotuwa')

.factory('LocationFilter', function() {

  var allLocations = [];

  var o = {};

  o.init = function(dealers) {
    allLocations = angular.copy(dealers);
  };

  o.getLocationByID = function(id) {
    return _.find(allLocations, {'id': id});
  };

  return o;
});
