angular.module('dankotuwa')

.controller('DetailViewCtrl', function($scope, $rootScope, $state, $stateParams, $cordovaLaunchNavigator, $ionicPopup, CurrentLocation, SignatureService) {
  $scope.location = $stateParams.location;

  var storeLocation = function(geo){
    console.log(geo)
  };

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

  $scope.showConfirm = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Change location data',
      template: "Are you sure you want change "+$scope.location.name+"'s location with the current location? This operation cannot be undone"
    });

    confirmPopup.then(function(res) {
      if(res) {
        console.log("Clicked okay");
        CurrentLocation.get().then(function(pos) {console.log(pos);});
        // APIService.sendOrder($scope.items, $scope.location.id).then(function(res) {
        //   $scope.items = [new Item()];
        //   SignatureService.remove();
        //   ionicToast.show('Order posted.', 'bottom', false, 3000);
        // }, function(err) {
        //    LE.log("Phone: ", $rootScope.model, " OS: ", $rootScope.version, "Error:",err);
        //    ionicToast.show('Check your internet connection!', 'bottom', false, 3000);
        // });
      }
    });
  };

  $scope.$on('$ionicView.enter', function(){
    SignatureService.remove();
  });
});
