angular.module('dankotuwa')

.controller('SplashCtrl', function($scope, $state, $ionicHistory) {
  var nextScreen = function() {
    $ionicHistory.nextViewOptions({
      disableBack: true
    });

    if (localStorage.getItem("openedOnce") === null){
      localStorage.setItem("openedOnce", "true");
      $state.go('app.initialsettings');
    } else {
      $state.go('app.mapview');
    }
***REMOVED***

  $scope.launch = nextScreen;

  // To be uncommented after launch day
  //$timeout(nextScreen, 3000);
});
