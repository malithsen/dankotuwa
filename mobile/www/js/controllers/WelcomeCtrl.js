angular.module('dankotuwa')

.controller('WelcomeCtrl', function($scope, $state) {

  $scope.start = function() {
    $state.go('app.mapview');
  }

  $scope.close = function() {
    ionic.Platform.exitApp();
  }
});
