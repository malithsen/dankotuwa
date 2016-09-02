angular.module('dankotuwa')

.controller('CardListCtrl', function($scope, $ionicFilterBar, DealerInfo, LocationFilter) {
  console.log('cardlist ctrl');
  $scope.locations = [];
  var filterBarInstance;

  var showCards = function() {
    DealerInfo.get().then(function(dealer) {
      LocationFilter.init(dealer);
      $scope.locations = dealer;
    });
  };

  $scope.showFilterBar = function () {
    console.log("filterbar init");
    filterBarInstance = $ionicFilterBar.show({
      items: $scope.locations,
      update: function (filteredItems, filterText) {
        $scope.locations = filteredItems;
      },
      filterProperties: 'name'
    });
  };

  $scope.$on('$ionicView.enter', function() {
    showCards();
  });

});
