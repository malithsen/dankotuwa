angular.module('dankotuwa')

.controller('DetailViewCtrl', function($scope, $state, $stateParams, $cordovaLaunchNavigator, CurrentLocation) {


  $scope.location = $stateParams.location;
  $scope.transactions = [
      {date:'One',product:'OneProduct',category:'OneCat',quantity:'OneQty'},
      {date:'Two',product:'TwoProduct',category:'TwoCat',quantity:'TwoQty'},
      {date:'Three',product:'ThreeProduct',category:'ThreeCat',quantity:'ThreeQty'}
  ];


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
        alert("Navigator launched");
      }, function (err) {
        alert(err);
      });
    });
  };

/*  $scope.showPastTransactions = function() {
    $scope.loc = $stateParams.location;
  };*/



});
