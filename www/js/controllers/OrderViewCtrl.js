angular.module('dankotuwa')

.controller('OrderViewCtrl', function($scope, $state, $stateParams) {
  $scope.location = $stateParams.location;

  console.log("order view ctrl", $scope.location);

});
