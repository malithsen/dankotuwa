angular.module('dankotuwa')

.directive('card', function($state) {

  var linkFn = function(scope, element) {
    scope.goToDetailView = function() {
      $state.go('app.detailview', {location: scope.location});
    };
  };

  return {
    restrict: 'E',
    scope: {
      location: '='
    },
    templateUrl: 'templates/card.html',
    link: linkFn
  };

});
