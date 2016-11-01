var dankotuwaApp = angular.module('dankotuwaApp', ['ui.router', 'angularMoment', 'angular-storage']);

dankotuwaApp.value("BackendUrl", "http://ec2-54-244-208-146.us-west-2.compute.amazonaws.com:8080");

dankotuwaApp.config(['$stateProvider', '$urlRouterProvider', "$locationProvider", "$httpProvider", function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

  $urlRouterProvider.otherwise("/");
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('/', {
      url: "/",
      templateUrl: "views/main",
      controller: 'rootCtrl'
    })
}]);
