angular.module('dankotuwa')

.controller('MapViewCtrl', function($scope, $state, $ionicPopup, CurrentLocation, MapService, ShedInfo, LocationFilter) {

  var shedClickCallback = function(id) {
    var location = LocationFilter.getLocationByID(id);
    $state.go('app.detailview', {location: location});
  };

  var showMap = function(position) {
    ShedInfo.get().then(function(sheds) {
      LocationFilter.init(sheds);
      $scope.map = MapService.draw(position, sheds, shedClickCallback);
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
});
