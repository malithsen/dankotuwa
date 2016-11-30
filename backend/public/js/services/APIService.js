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

  return o;
});
