angular.module('dankotuwa')

.controller('LoginCtrl', function($scope, $state, auth, store){

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
    console.log("error", JSON.stringify(e));
  };

  $scope.login = function () {
    $scope.message= 'loading...';

    auth.signin({
        popup: true,
        connection: 'google-oauth2',
        scope: 'openid name email',
      }, onLoginSuccess, onLoginFailed);
  };

}); 
