angular.module('dankotuwa')

.controller('LoginCtrl', function($scope, $state, auth, store){

  // function doLogin() {
  //   console.log("do login");
  //   auth.signin({
  //     container: 'lock-container',
  //     authParams: {
  //       scope: 'openid offline_access',
  //       device: 'Mobile device'
  //     }
  //   }, function (profile, token, accessToken, state, refreshToken) {
  //     // Success callback
  //     store.set('profile', profile);
  //     store.set('token', token);
  //     store.set('accessToken', accessToken);
  //     store.set('refreshToken', refreshToken);
  //     console.log(profile);
  //     $state.go("app.welcome");
  //   }, function (e) {
  //     // Error callback
  //     console.log("auth0 error", JSON.stringify(e));
  //   });
  // }

  // doLogin();

  function onLoginSuccess(profile, token, accessToken, state, refreshToken) {
    console.log("Success");
    store.set('profile', profile);
    store.set('token', token);
    store.set('accessToken', accessToken);
    store.set('refreshToken', refreshToken);
    console.log(profile);
    $state.go("app.welcome");
  };

  function onLoginFailed(e) {
    $scope.message = 'Access Denied!';
    // $scope.loading = false;
    console.log("error", JSON.stringify(e));
  };

  $scope.doGoogleAuthWithPopup = function () {
    $scope.message= 'loading...';
    // $scope.loading = true;
    console.log("GOOGLE");

    auth.signin({
        popup: true,
        connection: 'google-oauth2',
        scope: 'openid name email', //Details: https:///scopes
      }, onLoginSuccess, onLoginFailed);
  };

  // $scope.doGoogleAuthWithPopup();

}); 
