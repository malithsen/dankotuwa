angular.module('dankotuwaApp')

.controller('rootCtrl', function($scope, APIService) {
  console.log('root ctrl');
  var loading = true;
  $scope.reps = [];
  $scope.dealers = [];
  $scope.orders = [];

  function getOrders() {
    $scope.reps.forEach(function(rep) {
      APIService.getOrdersFromRep(rep.EmployeeID).then(function(res){
        $scope.orders.push(res.data);
      });
    });
  };

  APIService.getReps().then(function(res) {
    console.log(res);
    $scope.reps = res.data;
    getOrders();
  });

});
