angular.module('dankotuwa')

.controller('SignatureCtrl', function($scope) {
  var canvas = document.getElementById('signatureCanvas');
  var signaturePad = new SignaturePad(canvas);

  $scope.clearCanvas = function() {
    signaturePad.clear();
  };

  $scope.saveCanvas = function() {
    var sigImg = signaturePad.toDataURL();
    $scope.signature = sigImg;
    console.log(sigImg);
  };
});
