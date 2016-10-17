angular.module('AuthService', []).service('AuthService',
function ($q, $http, SERVER_URL_API) {
  function getTasks() {
    return $http.get(SERVER_URL_API + '/tasks');
  }

  return {
    getTasks: getTasks
  }
});
