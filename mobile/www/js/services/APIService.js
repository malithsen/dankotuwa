angular.module('dankotuwa')

.factory('APIService', function(BackendUrl, $http, store, SignatureService
  ) {

  var o = {};

  o.getProducts = function() {
    return $http({
      method: 'GET',
      url: BackendUrl + '/api/products'
    });
  };

  o.getCategories = function() {
    return $http({
      method: 'GET',
      url: BackendUrl + '/api/categories'
    });
  };

  o.sendOrder = function(items, dealerID) {
    var d = new Date();
    var seconds = Math.round(d.getTime() / 1000);
    var profile = store.get('profile');
    var sign = SignatureService.getSignature();

    var d = {};
    d['epoch'] = seconds;
    d['repID'] = profile.user_metadata.repId;
    d['dealerID'] = dealerID;
    d['atLocation'] = 1;
    d['items'] = items;
    d['signature'] = sign;
    console.log(d);
    return $http({
      method: 'POST',
      data: JSON.stringify(d),
      url: BackendUrl + '/api/order'
    });
  };


  return o;
});
