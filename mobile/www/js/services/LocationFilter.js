angular.module('dankotuwa')

.factory('LocationFilter', function() {

  var allLocations = [];

  var o = {};

  o.init = function(sheds) {
    allLocations = angular.copy(sheds);
  };

  o.getLocationByID = function(id) {
    return _.find(allLocations, {'id': id});
  };

  return o;
});
