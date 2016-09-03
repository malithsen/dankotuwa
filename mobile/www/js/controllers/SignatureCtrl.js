angular.module('dankotuwa')

.controller('SignatureCtrl', function($scope, $rootScope) {
  var canvas = document.getElementById('signatureCanvas');
  var signaturePad = new SignaturePad(canvas);

  $scope.clearCanvas = function() {
    signaturePad.clear();
  };

  $scope.saveCanvas = function() {
    var sigImg = signaturePad.toDataURL();
    $scope.signature = sigImg;
     LE.log("Phone: ", $rootScope.model, " OS: ", $rootScope.version, " ---> Took the Signature.");
    console.log(sigImg);
  };
});
