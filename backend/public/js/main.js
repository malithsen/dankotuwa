var dankotuwaApp = angular.module('dankotuwaApp', ['ui.router', 'angularMoment', 'angular-storage', 'angularModalService', 'ngSanitize', 'ngCsv', 'auth0.auth0', 'angular-jwt']);

dankotuwaApp.value("BackendUrl", "http://localhost:8080");

dankotuwaApp.config(['$stateProvider', '$urlRouterProvider', "$locationProvider", "$httpProvider", "angularAuth0Provider", function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, angularAuth0Provider) {

  $urlRouterProvider.otherwise("/");
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('/', {
      url: "/",
      views: {
        'content': {
          templateUrl: "order",
          controller: 'OrderCtrl'
        }
      },
      params: {pageTitle: 'Sales Orders'}
    })
    .state('detailview', {
      url: '/detailview',
      views: {
        'content': {
          templateUrl: "detailview",
          controller: 'DetailViewCtrl'
        }
      },
      params: {
        data: null, pageTitle: 'Order Details'
      }
    })
    .state('login', {
      url: '/login',
      views: {
        'main': {
          controller: 'LoginCtrl',
          templateUrl: 'login'
        }
      },
    })
    .state('settings', {
      url: '/settings',
      views: {
        'content': {
        templateUrl: "settings",
        controller: 'SettingsCtrl'
        }
      },
      params: {
        data: null, pageTitle: 'Settings'
      }
    })

    // Initialization for the angular-auth0 library
    angularAuth0Provider.init({
      clientID: 'TUo0Y0t8YJ4v03cAcaIvoex7oIj5BecZ',
      domain: 'malithsen.auth0.com'
    });
}]);

dankotuwaApp.run(function($rootScope, authService) {

  $rootScope.authService = authService;
  authService.checkAuthOnRefresh();
});
