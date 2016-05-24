angular.module('dankotuwa')

.controller('SearchViewCtrl', function($scope, $state, CurrentLocation, LocationFilter, SearchHistory, HaversineSearch){

  $scope.query = { string: '' };

  $scope.$on('$ionicView.enter', function(err){
    LocationFilter.resetFilter();
    $scope.userHistory = SearchHistory.get();
    console.log(LocationFilter.getFilteredLocations());
  });

  $scope.searchNearBy = function(){
    var position = CurrentLocation.get().then(function(position){
      var pos = {lat: position.coords.latitude, lng: position.coords.longitude}
      var hs = HaversineSearch.getRadiusAndIDs(pos);

      LocationFilter.setFilteredLocationsByIDs(hs.ids);
      $state.go('app.cardlist');
    });
***REMOVED***

  $scope.searchByCity = function(item){

    var query = $scope.query.string || item;

    SearchHistory.set(query);

    var geocoder = new google.maps.Geocoder();

    var params = {
      address: query,
      componentRestrictions: {
        country: 'LK'
      }
  ***REMOVED***

    geocoder.geocode(params, function(results, status){
      if(status === google.maps.GeocoderStatus.OK && results[0].formatted_address !== 'Sri Lanka'){
        console.log(results);

        var pos = { lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() };
        var hs = HaversineSearch.getRadiusAndIDs(pos);

        LocationFilter.setFilteredLocationsByIDs(hs.ids);
        $state.go('app.cardlist');
      }
      else{
          console.log('Failed to fetch geocoding: ' + status);
      }
    });
***REMOVED***

});
