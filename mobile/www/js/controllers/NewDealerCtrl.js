angular.module('dankotuwa')

.controller('NewDealerCtrl', function($scope, $rootScope, $ionicPopup, CurrentLocation, APIService, ionicToast, store) {

  console.log("in new dealer view")

  $scope.dealer = {name:'', address:'', phone:'', city:''};

  function validate(cb) {
    if ($scope.dealer['name'] === '') {
      cb(false, "Name cannot be empty");
    } else if ($scope.dealer['address'] === '') {
      cb(false, "Address field cannot be empty");
    } else if ($scope.dealer['city'] === '') {
      cb (false, "City cannot be empty");
    } else if ($scope.dealer['phone'] === '') {
      cb(false, "Phone cannot be empty");
    } else if ($scope.dealer['phone'].toString().length>10) {
      cb(false, "Phone number cannot contain more than 10 numbers");
    } else {
      cb(true, null);
    }
  };

  $scope.showConfirm = function() {

    var submitInfo = function(pos) {
      console.log($scope.dealer, pos);
      APIService.sendDealerInfo($scope.dealer, pos).then(function(success){
        ionicToast.show('Dealer recorded.', 'bottom', false, 3000);
        $scope.dealer = {name:'', address:'', phone:'', city:''};
      }, function(err) {
        ionicToast.show('Please Check your internet connection', 'bottom', false, 3000);
      });
    };

    validate(function(status, error) {
      if (status === true) {
        LE.log("Phone: ", $rootScope.model, " OS: ", $rootScope.version, "New dealer info submitted by :", store.get('profile').given_name);
        var confirmPopup = $ionicPopup.confirm({
          title: 'Change location data',
          template: "Are you sure the information are correct?"
        });
        confirmPopup.then(function(res) {
          if(res) {
            CurrentLocation.get().then(submitInfo);
          }
        });
      } else {
        //ionicToast.show(message, position, stick, time)
        ionicToast.show(error, 'bottom', true, 2000);
      }
    });
  };

});
