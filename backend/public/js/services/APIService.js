angular.module('dankotuwaApp')

.factory('APIService', function(BackendUrl, $http) {

  var o = {};

  o.getReps = function() {
    return $http({
      method: 'GET',
      url: BackendUrl + '/api/reps'
    });
  };

  o.getOrdersFromRep = function(id) {
    return $http({
      method: 'GET',
      url: BackendUrl + '/api/orders/rep/' + id
    });
  };

  o.getDealers = function() {
    return $http({
      method: 'GET',
      url: BackendUrl + '/api/dealers'
    });
  }

  return o;
});
