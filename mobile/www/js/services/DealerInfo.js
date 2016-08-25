angular.module('dankotuwa')

.factory('DealerInfo', function($http) {

  var generateUUID = function() {
    // http://stackoverflow.com/a/2117523/390522
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  };

  var o = {};

  o.get = function() {

    return $http.get('dealers.json').then(function(res) {
      return res.data.dealers.map(function(dealer) {
        return {
          id: generateUUID(),
          name: dealer.name,
          lat: dealer.lat,
          lng: dealer.lng,
          address: dealer.address,
          phone: dealer.phone,
          city: dealer.city,
        };
      });
    });
  };

  return o;
});
