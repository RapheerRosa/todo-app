angular.module('AuthService', []).service('AuthService',
function ($q, $http, USER_ROLES, SERVER_URL_AUTH) {
  var LOCAL_TOKEN_KEY = '_w1nt3r_1s_c0m1ng_',
      username = '',
      id = '',
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
    var info = token.split('.');
    username = info[0];
    id = info[1];
    isAuthenticated = true;
    authToken = info[2];

    role = USER_ROLES.public;

    $http.defaults.headers.common['X-Auth-Token'] = authToken;
  }

  function destroyUserCredentials() {
    authToken = undefined;
    id = '';
    username = '';
    isAuthenticated = false;
    $http.defaults.headers.common['X-Auth-Token'] = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  }

  var login = function (name, pw) {
    return $q(function (resolve, reject) {
      $http.post(SERVER_URL_AUTH, {username: name, password: pw})
        .then(function (response) {
          switch (response.status) {
            case 200:
              storeUserCredentials(name + '.' + response.data.id + '.' + response.data.token);
              resolve(true);
              break;
            default:
              reject(false);
              break;
          }

        });
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
    id: function () { return id; },
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
