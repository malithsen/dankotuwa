angular.module('dankotuwa')

.controller('InitialSettingsCtrl', function($scope, $state, $ionicHistory) {
  $scope.initial = true;

  $scope.saveAndContinue = function() {
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
    $state.go('app.mapview');
***REMOVED***
});
