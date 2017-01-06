angular.module('dankotuwaApp')

.service('authService', function (authManager, angularAuth0, jwtHelper, $location) {

  function login() {
    angularAuth0.login({
      connection: 'google-oauth2',
      responseType: 'token',
      popup: true
    }, onAuthenticated);
  }

  // Logging out just requires removing the user's
  // id_token and profile
  function logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    authManager.unauthenticate();
  }

  function onAuthenticated(error, authResult) {
    if (error) {
      return $ionicPopup.alert({
        title: 'Login failed!',
        template: error
      });
    }

    localStorage.setItem('id_token', authResult.idToken);
    authManager.authenticate();

    angularAuth0.getProfile(authResult.idToken, function (error, profileData) {
      if (error) {
        return console.log(error);
      }

      localStorage.setItem('profile', JSON.stringify(profileData));
      userProfile = profileData;

      $location.path('/');
    });
  }

  function checkAuthOnRefresh() {
    var token = localStorage.getItem('id_token');
    if (token) {
      if (!jwtHelper.isTokenExpired(token)) {
        authManager.authenticate();
      }
    } else {
      $location.path('/login');
    }
  }

  return {
    login: login,
    logout: logout,
    checkAuthOnRefresh: checkAuthOnRefresh
  }
});
