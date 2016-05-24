angular.module('dankotuwa')

.directive('nearbySearch', function(CurrentLocation){

  var linkFn = function(scope, elem){
    scope.currentAddress = '';
    CurrentLocation.getCurrentLocationAddress(function(address){
      scope.$apply(function() {
        scope.currentAddress = address;
      });
    });
***REMOVED***

  return {
    restrict: 'E',
    templateUrl: 'templates/nearby-search.html',
    link: linkFn
  }
});
