// Dankotuwa

angular.module('dankotuwa', ['ionic','ionic.service.core', 'ngCordova'])

.value("BackendUrl", "http://localhost:8080")

.run(function($ionicPlatform) {
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

    //Logging into ionic.io for push notifications
    Ionic.Auth.login("basic", {"remember":true}, {
      "email" : "user@dankotuwa.com",
      "password" : "secret"
    }).then(function(){
      console.log("Login success!");

      var push = new Ionic.Push({"debug" : true,
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
      console.log("Login failure!");
  });
    });
})

.config(function($stateProvider, $urlRouterProvider) {
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

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/mapview');
});
