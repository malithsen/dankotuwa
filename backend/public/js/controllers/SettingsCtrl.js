angular.module('dankotuwaApp')

.controller('SettingsCtrl', function($scope, $rootScope, $state, APIService) {
  console.log("SettingsCtrl");
  $scope.reps = [];
  $scope.date = {'start':'', 'end': ''};
  $scope.orders = [];
  $scope.data = [];

  function updateProductList(list) {
    list.forEach(function(entry) {
      if (entry.length !== 1) {
        APIService.updateProductList(entry);
      }
    })
  }

  function updateCategoryList(list) {
    list.forEach(function(entry) {
      if (entry.length !== 1) {
        APIService.updateCategoryList(entry);
      }
    })
  }

  $scope.getLists = function() {
    var categoryfile = document.getElementsByClassName('db-input')[0].files;
    var productfile = document.getElementsByClassName('db-input')[1].files;
    if(categoryfile.length >= 1) {

      Papa.parse(categoryfile[0], {
        complete: function(results) {
          updateCategoryList(results.data);
        }
      });
    }
    if(productfile.length >= 1) {
      Papa.parse(productfile[0], {
        complete: function(results) {
          updateProductList(results.data);
        }
      });
    }
  };

  $scope.generateReport = function() {
    var from = moment($scope.date.start).valueOf()/1000;
    var to = moment($scope.date.end).valueOf()/1000;
    $scope.exportData = []
    $scope.data = _.filter($scope.orders, function(o) { console.log(o); return o.epoch > from && o.epoch < to; });
    for (var d in $scope.data) {
      $scope.exportData.push(flatten($scope.data[d]))
    }
    return $scope.exportData;
  };

  function flatten (data) {
    var result = {};
    function recurse (cur, prop) {
      if (Object(cur) !== cur) {
        result[prop] = cur;
      } else if (Array.isArray(cur)) {
        for(var i=0, l=cur.length; i<l; i++)
          recurse(cur[i], prop);
        if (l == 0)
          result[prop] = [];
      } else {
        var isEmpty = true;
        for (var p in cur) {
          isEmpty = false;
          recurse(cur[p], prop ? prop+"."+p : p);
        }
        if (isEmpty && prop)
          result[prop] = {};
      }
    }
    recurse(data, "");
    return result;
  }

  function getOrders() {
    $scope.reps.forEach(function(rep) {
      APIService.getOrdersFromRep(rep.EmployeeID).then(function(res){
        $scope.orders.push.apply($scope.orders, res.data);
      });
    });
  }

  APIService.getReps().then(function(res) {
    $scope.reps = res.data;
    getOrders();
  });
});
