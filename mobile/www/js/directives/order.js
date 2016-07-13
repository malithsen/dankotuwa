angular.module('dankotuwa')

.directive('newItem', function() {
  return {
    restrict: 'A',
    templateUrl: 'templates/order.html',
    replace: true,
    transclude: false,
    scope: {
        aItem: '=newItem'
    }
  };
});
