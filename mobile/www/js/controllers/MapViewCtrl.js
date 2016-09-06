angular.module('dankotuwa')


.controller('MapViewCtrl', function($rootScope, $scope, $state, $ionicPopup, CurrentLocation, MapService, DealerInfo, LocationFilter, store) {

  var dealerClickCallback = function(id) {
    var location = LocationFilter.getLocationByID(id);
    $state.go('app.detailview', {location: location});
  };

  var showMap = function(position) {
    DealerInfo.get().then(function(dealer) {
      LocationFilter.init(dealer);
      $scope.map = MapService.draw(position, dealer, dealerClickCallback);
    });
  };

  var currentPosError = function(error){
    console.log("Could not get location");
    LE.log(error);
    showMap(null);
  };

  ionic.Platform.ready(function(){
    CurrentLocation.get().then(showMap, currentPosError);
  });

  $scope.zoomToCurrentPos = function() {
    CurrentLocation.get().then(MapService.zoomToCurrentPos, currentPosError);
  };

  $scope.goToCardList = function() {
    $state.go('app.cardlist');
  };

  // Hack: Call resize on the map object on entering the 'map-view' from
  // other screens due to partial rendering of the map.
  $scope.$on('$ionicView.enter', function() {
    var map = $scope.map;

    if ($rootScope.isOnline === false) {
      $scope.goToCardList();
    }

    // Hack: In the inital launch locationChangeSuccess won't fire. This redirects the user back to login
    if (store.get("token") === null) {
      $state.go('login');
    }

    // Resizing is avoided in the initial app load, since the map is yet to be initialized.
    if (map != undefined) {
      google.maps.event.trigger(map, "resize");
      map.setZoom(map.getZoom());
    }
  });

});
