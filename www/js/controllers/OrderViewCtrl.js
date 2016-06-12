angular.module('dankotuwa')

.controller('OrderViewCtrl', function($scope, $state, $stateParams) {
  $scope.location = $stateParams.location;

  $scope.items = [new Item()];

  function Item() {
      this.product = '';
      this.category = '';
      this.quantity = 0;
***REMOVED***

  function validate(cb) {
    var item;
    for (var i = 0; i < $scope.items.length; i++) {
      item = $scope.items[i]
      if (item['product'] == '') {
        cb(false);
      } else if (item['category'] == '') {
        cb(false);
      } else if (item['quantity'] === 0) {
        cb (false);
      } else {
        cb(true);
      }
    }
***REMOVED***

  $scope.addItem = function() {
    console.log('addItem', $scope.items);
    $scope.items.push(new Item());
***REMOVED***

  $scope.submit = function() {

    validate(function(res) {
      if (res) {
        console.log("submit", $scope.submit);
      } else {
        console.log("Did not submit");
      }
    })
  }


  console.log("order view ctrl", $scope.location);

});
