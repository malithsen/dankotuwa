angular.module('dankotuwaApp')

.controller('rootCtrl', function($scope, $rootScope, $state, $stateParams, APIService, socket, store, ModalService, authService) {
  console.log('root ctrl');
  var socket = io();

  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;

  $scope.date = {'start':'', 'end': ''};
  $scope.reps = [];
  $scope.dealers = [];
  $scope.orders = [];
  $scope.newOrders = false;

  socket.on('connect', function() {
    console.log('connected');
    flushCounts();
  });

  socket.on('order', function(res){
    console.log(res);
    var repID = res.repID;
    $scope.newOrders = true;
    var counts = store.get('newOrders') || {};
    if (repID in counts) {
      counts[repID]++;
    } else {
      counts[repID] = 1;
    }
    store.set('newOrders', counts);
    updateNewOrderCount();
    $scope.$apply();
  });

  function flushCounts() {
    console.log('flushing counts');
    var d = {};
    var counts = store.get('newOrders');
    for (repID in counts) {
      d[repID] = 0
    };
    store.set('newOrders', d);
    $scope.newOrders = false;
    updateNewOrderCount();
  }

  function updateNewOrderCount() {
    var counts = store.get('newOrders');
    for (repID in counts) {
      for (var i=0; i<$scope.reps.length; i++) {
        console.log($scope.reps[i], repID);
        if ($scope.reps[i].EmployeeID == repID) {
          $scope.reps[i]['newOrders'] = counts[repID] || 0;
          if (counts[repID] > 0) {
            $scope.newOrders = true;
          } else {
            $scope.newOrders = false;
          }
        }
      }
    }
    console.log($scope.reps);
  }


  function getOrders() {
    console.log("getting new ones");
    $scope.reps.forEach(function(rep) {
      APIService.getOrdersFromRep(rep.EmployeeID).then(function(res){
        $scope.orders.push.apply($scope.orders, res.data);
        $scope.orders = _.filter($scope.orders, function(order) { return order.invoiced;});
        // can be made more efficient with a promise. Good enough for the job
        $scope.orders = _.orderBy($scope.orders, 'epoch', 'desc');
        $scope.orderOrig = $scope.orders;
      });
    });
  }

  function refresh() {
    $scope.orders = [];
    APIService.getReps().then(function(res) {
      console.log(res);
      $scope.reps = res.data;
      getOrders();
      updateNewOrderCount();
    });
  }

  $scope.pushnotify = function() {

    ModalService.showModal({
      templateUrl: 'messagemodal',
      controller: function($scope, close) {
         $scope.close = close;

        $scope.sendpush = function(msg) {
          APIService.sendPush(msg).then(function(res) {
            console.log("Pushed", res);
            $scope.close();
          });
        }
      }
    });
  };


  $scope.filter = function() {
    var from = moment($scope.date.start).valueOf()/1000;
    var to = moment($scope.date.end).valueOf()/1000;
    if (to && from) {
      $scope.orders = _.filter($scope.orderOrig, function(o) { console.log(o); return o.epoch > from && o.epoch < to; });
    } else {
      $scope.orders = $scope.orderOrig;
    }
  };
 
  $scope.reloadOrders = function() {
    getOrders();
    flushCounts();
  };

  $scope.logout = function() {
    authService.logout();
  };

  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if (toState.name === "/") {
      refresh();
    }
  });

});
