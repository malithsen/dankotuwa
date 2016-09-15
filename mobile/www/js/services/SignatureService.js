angular.module('dankotuwa')

.factory('SignatureService', function() {

  var o = {};

  o.sigImg = '';

  o.getSignature = function() {
    return o.sigImg;
  };

  o.setSignature = function(string) {
    o.sigImg = string.split(",")[1];
  };

  return o;
});
