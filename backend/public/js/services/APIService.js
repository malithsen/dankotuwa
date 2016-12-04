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

  o.getSignature = function(orderid) {
    return $http({
      method: 'GET',
      url: BackendUrl + '/api/order/signature/' + orderid
    });
  };

  o.setInvoicedQuantity = function(order) {

    var d = {};
    d['orderid'] = order.orderNumber;
    d['items'] = order.items;

    return $http({
      method: 'PUT',
      data: JSON.stringify(d),
      url: BackendUrl + '/api/order'
    });
  };

  o.updateProductList = function(entry) {
    console.log(entry);
    var d = {'data':entry.join()};
    console.log(d);
    return $http({
      method: 'PUT',
      data: JSON.stringify(d),
      url: BackendUrl + '/api/update/products'
    });
  };

  o.updateCategoryList = function(entry) {
    console.log(entry);
    var d = {'data':entry.join()};
    console.log(d);
    return $http({
      method: 'PUT',
      data: JSON.stringify(d),
      url: BackendUrl + '/api/update/categories'
    });
  };

  o.updateRepsList = function(entry) {
    console.log(entry);
    var d = {'data':entry.join()};
    console.log(d);
    return $http({
      method: 'PUT',
      data: JSON.stringify(d),
      url: BackendUrl + '/api/update/reps'
    });
  };

  o.sendPush = function(msg) {
    console.log(msg);
    var headers = {
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI5MWI2NzUyNS1lY2MzLTQ1ZDYtODdhNS0zOGQ1YjgyODRhOTEifQ.WIC-XA7WwcisPNVBZIHlz5yjj03Ajapi5cdqosT1ls8',
      'Content-Type': 'application/json'
    };
    var d = '{"user_ids": ["0d8cb5c5-62d8-48bd-bebe-a3c63f676f75"],"profile": "dankotuwa","notification": {"message": "'+msg+'"}}';
    return $http({
      method: 'POST',
      data: d,
      url: 'https://api.ionic.io/push/notifications',
      headers: headers
    });
  };

  return o;
});
