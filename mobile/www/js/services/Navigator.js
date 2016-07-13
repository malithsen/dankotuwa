angular.module('dankotuwa')
.factory('$cordovaLaunchNavigator', ['$q', function ($q) {
  "use strict";

  var $cordovaLaunchNavigator = {};
  $cordovaLaunchNavigator.navigate = function (destination, options) {
    var q = $q.defer(),
      isRealDevice = ionic.Platform.isWebView();

    if (!isRealDevice) {
      q.reject("launchnavigator will only work on a real mobile device! It is a NATIVE app launcher.");
    } else {
      try {

        var successFn = options.successCallBack || function () {
            },
          errorFn = options.errorCallback || function () {
            },
          _successFn = function () {
            successFn();
            q.resolve();
          },
          _errorFn = function (err) {
            errorFn(err);
            q.reject(err);
        ***REMOVED***

        options.successCallBack = _successFn;
        options.errorCallback = _errorFn;

        launchnavigator.navigate(destination, options);
      } catch (e) {
        q.reject("Exception: " + e.message);
      }
    }
    return q.promise;
***REMOVED***

  return $cordovaLaunchNavigator;
}]);
