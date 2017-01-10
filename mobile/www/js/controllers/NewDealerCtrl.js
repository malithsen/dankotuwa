angular.module('dankotuwa')

.controller('NewDealerCtrl', function($scope, $ionicPopup, CurrentLocation, APIService, ionicToast) {

  console.log("in new dealer view")

  $scope.dealer = {name:'', address:'', phone:'', city:''};

  $scope.showConfirm = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Change location data',
      template: "Are you sure the information are correct?"
    });

    var submitInfo = function(pos) {
      console.log($scope.dealer, pos);
      APIService.sendDealerInfo($scope.dealer, pos).then(function(success){
        ionicToast.show('Dealer recorded.', 'bottom', false, 3000);
        $scope.dealer = {name:'', address:'', phone:'', city:''};
      }, function(err) {
        ionicToast.show('Please Check your internet connection', 'bottom', false, 3000);
      });
    };

    confirmPopup.then(function(res) {
      if(res) {
        CurrentLocation.get().then(submitInfo);
      }
    });
  };

});
