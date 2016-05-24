angular.module('dankotuwa')
.factory('HaversineSearch', function(LocationFilter){

  var o = {};

  var searchSettings = {
    minRadius: 5,
    maxRadius: 100,
    stepSize: 5
***REMOVED***

  var toRad = function(deg){
    return deg / 180.0 * Math.PI;
  }

  var haversine = function(lat1, lon1, lat2, lon2){
    lat1 = toRad(lat1);
    lat2 = toRad(lat2);
    lon1 = toRad(lon1);
    lon2 = toRad(lon2);

    var R = 6372.8;
    var dLat = lat2 - lat1;
    var dLon = lon2 - lon1;

    var a = Math.sin(dLat / 2) * Math.sin(dLat /2) + Math.sin(dLon / 2) * Math.sin(dLon /2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.asin(Math.sqrt(a));

    return R * c;
  }

  var geoSearchInJson = function(position){
    var ids = [];
    var sheds = LocationFilter.getFilteredLocations();

    while(ids.length == 0 && searchSettings.minRadius < searchSettings.maxRadius){
      for(var i = 0; i < sheds.length; i++){
        var geoPos = sheds[i];
        var hs = haversine(position.lat, position.lng, geoPos.lat, geoPos.lng);
        if(hs <= searchSettings.minRadius){
          ids.push(sheds[i].id);
        }
      }
      searchSettings.minRadius += searchSettings.stepSize;
    }

    return { ids: ids, radius: searchSettings.minRadius };
  }

  o.getRadiusAndIDs = function(position){
    searchSettings.minRadius = 5;
    return geoSearchInJson(position);
  }

  return o;
});