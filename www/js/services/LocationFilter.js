angular.module('dankotuwa')

.factory('LocationFilter', function($rootScope, Preferences) {

  var allLocations = [];
  var filteredLocations = [];
  var filterCriteria = [];

  $rootScope.$on('PREFS_CHANGED', function() {
    updateFilter();
  });

  var updateFilterByTag = function(arg) {
    filterCriteria = [arg];

    // Match the tags in JSON
    var query;
    if (arg === 'Nitrogen') {
      query = 'Nitrogen Air';
    } else if (arg === 'Supermarkets') {
      query = 'Super Market';
    } else {
      query = 'ATMs - HNB';
    }

    filteredLocations = angular.copy(allLocations).filter(function(shed) {
      return shed.tags.indexOf(query) > -1;
    });

    $rootScope.$broadcast('FILTER_CHANGED', filterCriteria);
***REMOVED***

  var updateFilter = function(arg) {
    filterCriteria = [];

    var prefs = Preferences.get();

    var subPrefs;
    if (prefs.type === 'petrol') {
      subPrefs = Object.keys(prefs.petrolPrefs).filter(function(pref) {
        return prefs.petrolPrefs[pref];
      });
    } else {
      subPrefs = Object.keys(prefs.dieselPrefs).filter(function(pref) {
        return prefs.dieselPrefs[pref];
      });
    }
    filterCriteria = filterCriteria.concat(subPrefs);

    filteredLocations = angular.copy(allLocations).filter(function(shed) {
      // If main fuel type is not available
      if (!shed[prefs.type].length) return false;

      // If no sub type preference is specified, true
      if (!subPrefs.length) return true;

      // If any of the sub type preferences is available, true
      return shed[prefs.type].some(function(type) {
        return subPrefs.indexOf(type) > -1;
      });
    });

    if (!filterCriteria.length) {
      if (prefs.type === 'petrol') {
        filterCriteria = ['Petrol 92', 'Xtra Premium Euro 3', 'Xtra Premium 95'];
      } else {
        filterCriteria = ['Lanka Diesel', 'Lanka Super Diesel', 'Diesel Xtra Mile'];
      }
    }

    $rootScope.$broadcast('FILTER_CHANGED', filterCriteria);
***REMOVED***

  var o = {};

  o.init = function(sheds) {
    allLocations = angular.copy(sheds);
    updateFilter();
***REMOVED***

  o.getFilteredLocations = function() {
    return filteredLocations;
***REMOVED***

  o.getFilterCriteria = function() {
    return filterCriteria;
***REMOVED***

  o.isFiltered = function(id) {
    return filteredLocations.some(function(location) {
      return location.id === id;
    });
***REMOVED***

  o.getLocationByID = function(id) {
    return _.find(allLocations, {'id': id});
***REMOVED***

  o.setFilteredLocationsByIDs = function(ids) {
    filteredLocations = angular.copy(allLocations).filter(function(location) {
      return ids.indexOf(location.id) > -1;
    });
***REMOVED***

  o.resetFilter = function() {
    updateFilter();
***REMOVED***

  o.filterBy = function(arg) {
    updateFilterByTag(arg);
***REMOVED***

  return o;
});
