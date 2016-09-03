angular.module('dankotuwa')

.controller('WelcomeCtrl', function($scope, $rootScope, $state, store) {
  var profile = store.get('profile');
  $scope.name = profile.given_name;

  $scope.start = function() {
    $state.go('app.mapview');
  }

  $scope.close = function() {
    ionic.Platform.exitApp();
  }
});
