var dankotuwaApp = angular.module('dankotuwaApp', ['ui.router', 'angularMoment', 'angular-storage']);

dankotuwaApp.value("BackendUrl", "http://localhost:8080");

dankotuwaApp.config(['$stateProvider', '$urlRouterProvider', "$locationProvider", "$httpProvider", function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

  $urlRouterProvider.otherwise("/");
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('/', {
      url: "/",
      templateUrl: "views/order",
      controller: 'OrderCtrl',
    })
    .state('detailview', {
      url: '/detailview',
      templateUrl: "views/detailview",
      controller: 'DetailViewCtrl',
      params: {
        data: null
      }
    })
}]);
