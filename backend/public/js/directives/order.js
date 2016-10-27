angular.module('dankotuwaApp')

.directive('daOrder', [function() {

  var linkFn = function(scope, element) {
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
