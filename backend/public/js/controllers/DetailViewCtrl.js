angular.module('dankotuwaApp')

.controller('DetailViewCtrl', function($scope, $stateParams, $state, APIService, ModalService) {
  $scope.order = $stateParams.data;
  $scope.signature = '';

  $scope.invoicedqty = {};
  console.log("DetailViewCtrl", $scope.order);

  var fetchSignature = function() {
    APIService.getSignature($scope.order.orderNumber).then(function(res) {
      if (res.data.sign) {
        $scope.signature = res.data.sign;
      }
    });
  };

  var markOrder = function() {
    console.log($scope.order);
    APIService.setInvoicedQuantity($scope.order).then(function(res) {
      console.log(res);
      $state.go('/')
    });
  };

  $scope.confirm = function() {
    ModalService.showModal({
      templateUrl: 'confirmmodal',
      controller: function($scope, close) {
        $scope.close = close;

        $scope.confirmed = function(msg) {
          markOrder();
        }
      }
    });
  };

  $scope.showSignature = function() {
    showAModal($scope.signature);
  };

  $scope.clear = function() {
    $scope.order.items.forEach(function(item){
      item.invoicedQuantity = '';
    });
  };

  var showAModal = function(img) {

    ModalService.showModal({
      template: '<div id="custom-modal">'+
        '<div id="overlay">'+
        '<div id="signature-img"><img data-ng-src="data:image/png;base64,'+img+'"/></div>'+
        '<div id="close-btn"><a href ng-click="close()">Close</a></div>'+
        '</div>'+
        '<div id="fade"></div>'+
        '</div>',
      controller: function($scope, close) {
         $scope.close = close;
      }
    });
  };

  fetchSignature();

});
