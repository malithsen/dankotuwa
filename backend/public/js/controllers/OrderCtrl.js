angular.module('dankotuwaApp')

.controller('OrderCtrl', function($scope, $rootScope, $state) {
  console.log("OrderCtrl");
  $rootScope.title = 'Order Details';

  $scope.goToDetailView = function(order) {
    console.log("going to detailview");
    $state.go('detailview', {data: order});
  };
});
