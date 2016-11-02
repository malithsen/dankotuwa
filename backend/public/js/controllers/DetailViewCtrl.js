angular.module('dankotuwaApp')

.controller('DetailViewCtrl', function($scope, $stateParams) {
  $scope.order = $stateParams.data;
  console.log("DetailViewCtrl", $scope.order);
});
