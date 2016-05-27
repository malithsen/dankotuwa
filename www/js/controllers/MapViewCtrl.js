angular.module('dankotuwa')

.controller('MapViewCtrl', function($scope, $state, CurrentLocation, MapService, ShedInfo) {

  var shedClickCallback = function(id) {
    $state.go('app.detailview', {location: location});
***REMOVED***

  var currentPosSuccess = function(position) {
    ShedInfo.get().then(function(sheds) {
      $scope.map = MapService.draw(position, sheds, shedClickCallback);
    });
***REMOVED***

  var currentPosError = function(error){
    console.log("Could not get location");
***REMOVED***

  ionic.Platform.ready(function(){
    CurrentLocation.get().then(currentPosSuccess, currentPosError);
  });

  $scope.zoomToCurrentPos = MapService.zoomToCurrentPos;

  $scope.goToCardList = function() {
    $state.go('app.cardlist');
***REMOVED***
});
