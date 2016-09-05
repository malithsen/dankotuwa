angular.module('dankotuwa')

.controller('SignatureCtrl', function($scope, $rootScope, $ionicHistory, SignatureService) {
  var canvas = document.getElementById('signatureCanvas');
  var signaturePad = new SignaturePad(canvas);

  $scope.clearCanvas = function() {
    signaturePad.clear();
  };

  $scope.saveCanvas = function() {

    var sigImg = signaturePad.toDataURL();
    $scope.signature = sigImg;
    LE.log("Phone: ", $rootScope.model, " OS: ", $rootScope.version, " ---> Took the Signature.");
    SignatureService.setSignature(sigImg)
    console.log(sigImg);
    $ionicHistory.goBack();
  };
  
});
