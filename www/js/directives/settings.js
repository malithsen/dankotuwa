angular.module('dankotuwa')

.directive('settings', function(Preferences) {

  var linkFn = function(scope, element) {
    scope.prefs = Preferences.get();

    scope.setFuelType = function(type) {
      scope.prefs.type = type;
      Preferences.save(scope.prefs);
  ***REMOVED***

    scope.updatePrefs = function() {
      Preferences.save(scope.prefs);
  ***REMOVED***

    scope.$on('PREFS_CHANGED', function() {
      scope.prefs = Preferences.get();
    });
***REMOVED***

  return {
    restrict: 'E',
    templateUrl: 'templates/settings.html',
    link: linkFn
***REMOVED***

});
