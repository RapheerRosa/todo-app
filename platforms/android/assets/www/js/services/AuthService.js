angular.module('AuthService', []).service('AuthService',
function ($q, $http, USER_ROLES) {
  var LOCAL_TOKEN_KEY = '..w1nt3r_1s_c0m1ng..',
      username = '',
      isAuthenticated = false,
      role = '',
      authToken = '';

  function loadUserCredentials() {
    var token =  window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      useCredentials(token);
    }
  }

  function storeUserCredentials(token) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    useCredentials(token);
  }

  function useCredentials(token) {
    username = token.split('.')[0];
    isAuthenticated = true;
    authToken = token.split[1];

    role = USER_ROLES.public;

    $http.defaults.headers.common['X-Auth-Token'] = authToken;
  }

  function destroyUserCredentials() {
    authToken = undefined;
    username = '';
    isAuthenticated = false;
    $http.defaults.headers.common['X-Auth-Token'] = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  }

  var login = function (name, pw) {
    return $q(function (resolve, reject) {
      //TODO: server call
      storeUserCredentials(name + '.token_do_servidor');
      resolve('ok'); // TODO: handle not authorized
    });
  };

  var logout = function () {
    destroyUserCredentials();
  }

  var isAuthorized = function (authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) authorizedRoles = [authorizedRoles];
    return (isAuthenticated && authorizedRoles.indexOf(role) > -1);
  }

  loadUserCredentials();

  return {
    login: login,
    logout: logout,
    isAuthorized: isAuthorized,
    isAuthenticated: function () { return isAuthenticated; },
    username: function () { return username; },
    role: function () { return role; }
  };
})

.factory('AuthInterceptor',
function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized
      }[response.status], response);
      return $q.reject(response);
    }
  }
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});
