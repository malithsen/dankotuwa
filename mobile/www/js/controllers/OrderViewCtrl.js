angular.module('dankotuwa')

.controller('OrderViewCtrl', function($scope, $state, $stateParams, $ionicPopup, $cordovaPrinter, APIService, InvoiceService,ionicToast) {
  $scope.location = $stateParams.location;
  $scope.products = [];
  $scope.categories = [];
  console.log($scope.location);

  $scope.items = [new Item()];

  function Item() {
    this.product = {};
    this.category = {};
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
        //ionicToast.show(message, position, stick, time)
        ionicToast.show('Please ensure that the order details are correct!', 'bottom', false, 3000);
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
        APIService.sendOrder($scope.items, $scope.location.id).then(function(res) {
          $scope.items = [new Item()];
           ionicToast.show('Order posted.', 'bottom', false, 3000);
        }, function(err) {
           ionicToast.show('Check your internet connection!', 'bottom', false, 3000);
        });
      }
    });
  };

  $scope.print = function() {
    console.log("print");
    if($cordovaPrinter.isAvailable()) {
      console.log("printing");
      $cordovaPrinter.print(InvoiceService.generateInvoice($scope.items, $scope.location.name));
    } else {
      alert("Printing is not available on device");
    }
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
