angular.module('dankotuwa')

.controller('OrderViewCtrl', function($scope, $rootScope, $state, $stateParams, $ionicPopup, $cordovaPrinter, APIService, InvoiceService,ionicToast) {
  $scope.location = $stateParams.location;
  $scope.products = [];
  $scope.categories = [];
  $scope.items = [new Item()];


  function Item() {
    this.product = {};
    this.category = {};
    this.quantity = 0;
  };

  function validate(cb) {
    var item;
    var itemsProcessed = 0;
    var counter = {};  //keep keys as product + category and make values the number of times it has occured

    for (var i = 0; i < $scope.items.length; i++) {
      item = $scope.items[i];
      counter[item.product.ProductName + item.category.CategoryName] = (counter[item.product.ProductName + item.category.CategoryName] || 0) + 1;
      itemsProcessed++;

      if (!item['product'].hasOwnProperty('ProductID')) {
        cb(false, "Product field cannot be empty");
      } else if (!item['category'].hasOwnProperty('CategoryID')) {
        cb(false, "Category field cannot be empty");
      } else if (counter[item.product.ProductName + item.category.CategoryName] > 1) {
        cb(false, "Make sure there are no duplicate entries");
      } else if (item['quantity'] === 0) {
        cb (false, "Quantity cannot be empty");
      } else if (itemsProcessed == $scope.items.length) {
        cb(true, null);
      }
    }

  };

  $scope.addItem = function() {
    LE.log("Phone: ", $rootScope.model, " OS: ", $rootScope.version, "addItem",$scope.items);
    console.log('addItem', $scope.items);
    $scope.items.push(new Item());
  };

  $scope.submit = function() {


    validate(function(status, error) {
      if (status === true) {
        LE.log("Phone: ", $rootScope.model, " OS: ", $rootScope.version, "Order Submitted");
        console.log("submit", $scope.items);
        $scope.showConfirm();
      } else {
        //ionicToast.show(message, position, stick, time)
        ionicToast.show(error, 'bottom', true, 2000);
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
           LE.log("Phone: ", $rootScope.model, " OS: ", $rootScope.version, "Error:",err);
           ionicToast.show('Check your internet connection!', 'bottom', false, 3000);
        });
      }
    });
  };

  $scope.print = function() {
    console.log("print");
    if($cordovaPrinter.isAvailable()) {
      LE.log("Phone: ", $rootScope.model, " OS: ", $rootScope.version, "---> Printed the invoice...");
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
  LE.log("Phone: ", $rootScope.model, " OS: ", $rootScope.version, "Order Submitted location:", $scope.location);

});
