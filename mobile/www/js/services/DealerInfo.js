angular.module('dankotuwa')

.factory('DealerInfo', function($http) {

  var o = {};

  o.get = function() {

    return $http.get('dealers.json').then(function(res) {
      return res.data.dealers.map(function(dealer) {
        return {
          id: dealer.id,
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
