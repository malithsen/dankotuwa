angular.module('dankotuwa')

.factory('ShedInfo', function($http) {

  var o = {};

  o.get = function() {
    return $http.get('sheds.json').then(function(res) {
      return res.data.sheds.map(function(shed) {
        return {
          name: shed.name,
          lat: shed.lat,
          lng: shed.lng,
          address: shed.address.replace(/&#044;/g, ' '),
          phone: shed.phone,
          hours: shed.hours,
          city: shed.city,
          tags: shed.tags.split('&#044;')
      ***REMOVED***
      });
    });
***REMOVED***

  return o;
});
