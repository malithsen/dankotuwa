angular.module('dankotuwa')

.controller('AppCtrl', function($scope, $rootScope, $ionicModal, $timeout, $cordovaNetwork, $cordovaDevice, $cordovaAppVersion, $state, auth, store) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Get device info
  document.addEventListener("deviceready", function () {
    // Returns Object :— cordova, model, platform, UUID, and version information
    var device = $cordovaDevice.getDevice();

    $rootScope.model = device.model;
    $rootScope.version = device.version;
    $scope.isOnline = $cordovaNetwork.isOnline();

    // Get app version
    $cordovaAppVersion.getVersionNumber().then(function(version) {
      $rootScope.appVersion = version;
    });

    // Binding may not always work...
    $scope.$apply();

    $rootScope.$on('$cordovaNetwork:online', function(event, networkState) {
      $scope.isOnline = true;
      $scope.$apply();
    });

    $rootScope.$on('$cordovaNetwork:offline', function(event, networkState) {
      LE.log("Phone: ", $rootScope.model, " OS: ", $rootScope.version, " ---> Data connection lost!!!");
      $scope.isOnline = false;
      $scope.$apply();
    });
  }, false);


  $scope.logout = function() {
    auth.signout();

    store.remove('profile');
    store.remove('token');
    store.remove('accessToken');
    store.remove('refreshToken');

    $state.go('login');
  };

})

