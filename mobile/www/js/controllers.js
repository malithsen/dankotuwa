angular.module('dankotuwa')

.controller('AppCtrl', function($scope, $rootScope, $ionicModal, $timeout, $cordovaNetwork, $cordovaDevice, $cordovaAppVersion) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

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

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

