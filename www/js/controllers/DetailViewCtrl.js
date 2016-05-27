angular.module('dankotuwa')

.controller('DetailViewCtrl', function($scope, $state, $stateParams, $cordovaLaunchNavigator, CurrentLocation) {
  $scope.location = $stateParams.location;

  $scope.navigate = function (lat, lng) {

    var dest = [parseFloat(lat), parseFloat(lng)];
    var options = {timeout: 10000, enableHighAccuracy: true};

    CurrentLocation.get().then(function(position){
      var start = [position.coords.latitude, position.coords.longitude];

      $cordovaLaunchNavigator.navigate(dest, {
        start: start,
        enableDebug: true
      }).then(function () {
        alert("Navigator launched");
      }, function (err) {
        alert(err);
      });
    });
***REMOVED***
});