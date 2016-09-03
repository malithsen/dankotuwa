angular.module('dankotuwa')

.controller('DetailViewCtrl', function($scope, $rootScope, $state, $stateParams, $cordovaLaunchNavigator, CurrentLocation) {
  $scope.location = $stateParams.location;

  $scope.goToPlaceOrderView = function() {
    $state.go('app.orderview', {location: $scope.location});
  };

  $scope.navigate = function (lat, lng) {

    var dest = [parseFloat(lat), parseFloat(lng)];
    var options = {timeout: 10000, enableHighAccuracy: true};

    CurrentLocation.get().then(function(position){
      var start = [position.coords.latitude, position.coords.longitude];

      $cordovaLaunchNavigator.navigate(dest, {
        start: start,
        enableDebug: true
      }).then(function () {
        console.log("Navigator launched");
      }, function (err) {
        LE.log("Phone: ", $rootScope.model, " OS: ", $rootScope.version, "Error:",err);
        console.log(err);
      });
    });
  };
});
