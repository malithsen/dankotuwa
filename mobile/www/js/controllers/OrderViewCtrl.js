angular.module('dankotuwa')

.controller('OrderViewCtrl', function($scope, $state, $stateParams, $ionicPopup, APIService) {
  $scope.location = $stateParams.location;
  $scope.products = [];
  $scope.categories = [];

  $scope.items = [new Item()];

  function Item() {
    this.productId = '';
    this.categoryId = '';
    this.quantity = 0;
  };

  function validate(cb) {
    var item;
    var itemsProcessed = 0;
    for (var i = 0; i < $scope.items.length; i++) {
      item = $scope.items[i];
      itemsProcessed++;
      if (item['product'] == '') {
        cb(false);
      } else if (item['category'] == '') {
        cb(false);
      } else if (item['quantity'] === 0) {
        cb (false);
      } else if (itemsProcessed == $scope.items.length) {
        cb(true);
      }
    }
  };

  $scope.addItem = function() {
    console.log('addItem', $scope.items);
    $scope.items.push(new Item());
  };

  $scope.submit = function() {

    validate(function(res) {
      if (res === true) {
        console.log("submit", $scope.items);
        $scope.showConfirm();
      } else {
        console.log("Did not submit");
      }
    });
  };

  $scope.showConfirm = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Submit',
      template: 'Are you sure you want to submit the order?'
    });

    confirmPopup.then(function(res) {
      if(res) {
        console.log("Clicked okay");
        APIService.sendOrder($scope.items).then(function(res) {
          $scope.items = [new Item()];
          console.log("success");
        }, function(err) {
          console.log("WTF went wrong?", err);
        });
      }
    });
  };

  APIService.getProducts().then(function(res){
    $scope.products = res.data;
    console.log(res.data);
  });

  APIService.getCategories().then(function(res) {
    $scope.categories = res.data;
    console.log(res.data);
  });


  console.log("order view ctrl", $scope.location);

});
