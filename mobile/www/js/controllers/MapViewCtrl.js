angular.module('dankotuwa')

.controller('MapViewCtrl', function($scope, $state, $ionicPopup, CurrentLocation, MapService, ShedInfo, LocationFilter) {

  var shedClickCallback = function(id) {
    var location = LocationFilter.getLocationByID(id);
    $state.go('app.detailview', {location: location});
***REMOVED***

  var showMap = function(position) {
    ShedInfo.get().then(function(sheds) {
      LocationFilter.init(sheds);
      $scope.map = MapService.draw(position, sheds, shedClickCallback);
    });
***REMOVED***

  var currentPosError = function(error){
    console.log("Could not get location");
    showMap(null);
***REMOVED***

  ionic.Platform.ready(function(){
    CurrentLocation.get().then(showMap, currentPosError);
  });

  $scope.zoomToCurrentPos = MapService.zoomToCurrentPos;

  $scope.goToCardList = function() {
    $state.go('app.cardlist');
***REMOVED***
});
