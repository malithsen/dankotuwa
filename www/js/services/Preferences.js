angular.module('dankotuwa')

.factory('Preferences', function($rootScope) {

  var o = {};

  o.get = function() {
    var defaults = {
      type: 'petrol',
      petrolPrefs: {
        'Petrol 92': true
      },
      dieselPrefs: {
        'Lanka Diesel': true
      }
  ***REMOVED***
    var saved = localStorage.getItem('prefs');
    return saved ? JSON.parse(saved) : defaults;
***REMOVED***

  o.save = function(prefs) {
    localStorage.setItem('prefs', JSON.stringify(prefs));
    $rootScope.$broadcast('PREFS_CHANGED');
***REMOVED***

  return o;
});
