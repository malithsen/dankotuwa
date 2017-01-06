angular.module('dankotuwaApp')

.controller('LoginCtrl', function($scope, authService) {

  $scope.login = function () {
    authService.login();
  };
});
