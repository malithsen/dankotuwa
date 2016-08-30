// Dankotuwa

angular.module('dankotuwa', ['ionic','ionic.service.core', 'ngCordova', 'auth0', 'angular-storage', 'angular-jwt','ionic-toast'])

.value("BackendUrl", "http://ec2-54-244-208-146.us-west-2.compute.amazonaws.com:8080")

.run(function($ionicPlatform, $rootScope, $location, auth, store, jwtHelper) {
  $ionicPlatform.ready(function() {
    console.log("Logging");
    LE.log("Initializing Dankotuwa ionic platform");
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    if (window.cordova && cordova.plugins) {
      cordova.plugins.printer.check(function (avail, count) {
        console.log("avail", avail, "count", count);
          console.log(avail ? 'Found ' + count + ' services' : 'No');
      });
    }

    // This hooks all auth events to check everything as soon as the app starts
    auth.hookEvents();

    //This event gets triggered on URL change
    var refreshingToken = null;
    $rootScope.$on('$locationChangeSuccess', function () {
      var token = store.get('token');
      var refreshToken = store.get('refreshToken');
      console.log(token);
      console.log(refreshToken);
      if (token) {
        if (!jwtHelper.isTokenExpired(token)) {
          if (!auth.isAuthenticated) {
            auth.authenticate(store.get('profile'), token);
          }
        } else {
          if (refreshToken) {
            if (refreshingToken === null) {
              refreshingToken = auth.refreshIdToken(refreshToken).then(function (idToken) {
                store.set('token', idToken);
                auth.authenticate(store.get('profile'), idToken);
              }).finally(function () {
                refreshingToken = null;
              });
            }
            return refreshingToken;
          } else {
            $location.path('/login');
          }
        }
      } else {
        $location.path('/login');
      }
    });

    //Logging into ionic.io for push notifications
    Ionic.Auth.login("basic", {"remember":true}, {
      "email" : "user@dankotuwa.com",
      "password" : "secret"
    }).then(function(){
      console.log("Push login success!");

      var push = new Ionic.Push({"debug" : false,
        "onNotification": function(notification){
          console.log(notification);
          console.log(notification.payload);
        }
      });

      push.register(function(token) {
      // Log out your device token (Save this!)
        console.log(token);
        console.log("Got Token:",token.token);
        push.saveToken(token);
      });
    }, function(){
      console.log("Push login failure!");
  });
    });
})

.config(function($stateProvider, $urlRouterProvider, authProvider, $httpProvider, jwtInterceptorProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.mapview', {
    url: '/mapview',
    views: {
      'menuContent': {
        templateUrl: 'templates/mapview.html',
        controller: 'MapViewCtrl'
      }
    }
  })

  .state('app.signature', {
    url: '/signature',
    views: {
      'menuContent': {
        templateUrl: 'templates/signature.html',
        controller: 'SignatureCtrl'
      }
    },
    params: {
      location: null
    }
  })

  .state('app.detailview', {
    url: '/detailview',
    views: {
      'menuContent': {
        templateUrl: 'templates/detailview.html',
        controller: 'DetailViewCtrl'
      }
    },
    params: {
      location: null
    }
  })

  .state('app.orderview', {
    url: '/orderview',
    views: {
      'menuContent': {
        templateUrl: 'templates/orderview.html',
        controller: 'OrderViewCtrl'
      }
    },
    params: {
      location: null
    }
  })

  .state('app.cardlist', {
    url: '/cardlist',
    views: {
      'menuContent': {
        templateUrl: 'templates/cardlist.html',
        controller: 'CardListCtrl'
      }
    }
  })

  .state('app.welcome', {
    url: '/welcome',
    views: {
      'menuContent': {
        templateUrl: 'templates/welcome.html',
        controller: 'WelcomeCtrl'
      }
    }
  })

  .state('login', { // Notice: this state name matches the loginState property value to set in authProvider.init({...}) below...
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('app/mapview');

  // Initialized the Auth0 provider
  authProvider.init({
    domain: "malithsen.auth0.com",
    clientID: "TUo0Y0t8YJ4v03cAcaIvoex7oIj5BecZ",
    callbackURL: location.href,
    loginState: 'login'
  });

});
