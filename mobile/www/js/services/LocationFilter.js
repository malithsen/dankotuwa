angular.module('dankotuwa')

.factory('LocationFilter', function() {

  var allLocations = [];

  var o = {};

  o.init = function(sheds) {
    allLocations = angular.copy(sheds);
***REMOVED***

  o.getLocationByID = function(id) {
    return _.find(allLocations, {'id': id});
***REMOVED***

  return o;
});
