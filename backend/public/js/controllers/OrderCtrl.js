angular.module('dankotuwaApp')

.controller('OrderCtrl', function($scope, $state) {
  console.log("OrderCtrl");

  $scope.goToDetailView = function(order) {
    console.log("going to detailview");
    $state.go('detailview', {data: order});
  };
});
