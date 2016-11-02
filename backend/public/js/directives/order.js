angular.module('dankotuwaApp')

.directive('daOrder', ['$state', function($state) {

  var linkFn = function(scope, element) {
    scope.goToDetailView = function() {
      console.log("going to detailview");
      $state.go('app.detailview', {data: []});
    };
  };

  return {
    restrict: 'E',
    scope: {
      order: '='
    },
    templateUrl: 'views/order',
    link: linkFn
  };
}]);
