angular.module('dankotuwa')

.factory('MapService', function($rootScope) {

  var map;
  var currentPos;
  var shedMarkers;
  var currentPositionMarker;

  var o = {};

  o.draw = function(position, sheds, shedClickCallback) {

    var log = function() {
      LE.log.apply(LE, ["Phone: ", $rootScope.model, " OS: ", $rootScope.version, " App v.", $rootScope.appVersion].concat(arguments));
    };

    if (position) {
      currentPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      log(" ---> Rendered map with current position coordinates lat: "+ position.coords.latitude +" and long: "+ position.coords.longitude);
    } else {
      currentPos = new google.maps.LatLng(6.9327031, 79.843654);
      log(" ---> Unable to get current position!!!");
    }

    var mapOptions = {
      center: currentPos,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    };

    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // Mark current pos
    google.maps.event.addListenerOnce(map, 'idle', function(){
      currentPositionMarker = new google.maps.Marker({
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        map: map,
        animation: google.maps.Animation.DROP,
        position: currentPos
      });
    });

    // Mark sheds
    shedMarkers = sheds.map(function(shed) {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(shed.lat, shed.lng),
        map: map,
        icon: {
          path: MAP_PIN,
          fillColor: '#E67E22',
          fillOpacity: 1,
          strokeColor: '',
          strokeWeight: 0,
          scale: 0.8
        },
      });

      marker.addListener('click', function() {
        shedClickCallback(shed.id);
      });

      return {
        id: shed.id,
        marker: marker
      };
    });

    return map;
  };

  o.zoomToCurrentPos = function(position) {
    currentPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    map.setZoom(14);
    currentPositionMarker.setPosition(currentPos);
    map.panTo(currentPos);
  };

  return o;
});
