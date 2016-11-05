angular.module('dankotuwaApp')

.controller('DetailViewCtrl', function($scope, $stateParams, APIService, ModalService) {
  $scope.order = $stateParams.data;
  console.log("DetailViewCtrl", $scope.order);

  $scope.getSignature = function(orderid) {
    APIService.getSignature(orderid).then(function(res) {
      console.log(res);
      showAModal(res.data.sign);
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
    }).then(function(modal) {
      modal.close.then(function(result) {
        $scope.message = result ? "You said Yes" : "You said No";
      });
    });

  };

});
