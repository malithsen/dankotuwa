angular.module('dankotuwa')

<<<<<<< HEAD
.controller('SignatureCtrl', function($scope, $rootScope) {
=======
.controller('SignatureCtrl', function($scope,$rootScope) {
>>>>>>> Backend Publish
  var canvas = document.getElementById('signatureCanvas');
  var signaturePad = new SignaturePad(canvas);

  $scope.clearCanvas = function() {
    signaturePad.clear();
  };

  $scope.saveCanvas = function() {

    var sigImg = signaturePad.toDataURL();
    $scope.signature = sigImg;
<<<<<<< HEAD
     LE.log("Phone: ", $rootScope.model, " OS: ", $rootScope.version, " ---> Took the Signature.");
    console.log(sigImg);
=======
    //console.log(sigImg);
    var result=sigImg.split(",");
    $scope.byteCharacters=atob(result[1]);
    $rootScope.signatureBlob=$scope.byteCharacters;


>>>>>>> Backend Publish
  };
  
});
