angular.module('dankotuwa')

.factory('ShedInfo', function($http) {

  var generateUUID = function() {
    // http://stackoverflow.com/a/2117523/390522
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  };

  var o = {};

  o.get = function() {
    var strToArr = function(str) {
      if (!str) return [];
      return str.split(',').map(function(item) {
        return item.trim();
      });
    };

    return $http.get('sheds.json').then(function(res) {
      return res.data.sheds.map(function(shed) {
        return {
          id: generateUUID(),
          name: shed.name,
          lat: shed.lat,
          lng: shed.lng,
          address: shed.address,
          phone: shed.phone,
          city: shed.city,
          tags: strToArr(shed.tags),
          distance: null,
          approxTime: null
        };
      });
    });
  };

  return o;
});
