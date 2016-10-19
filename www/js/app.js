var todo = angular.module('todo', ['ionic', 'Routes', 'ParentController', 'AppController',
'LoginController', 'HomeController', 'ProfileController', 'TasksController', 'ShareDataService', 
'AuthService', 'TasksService']);

todo.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

todo.constant('HTTP_EVENTS', {
  serverError: 'server-error',
  notFound: 'not-found'
});

todo.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
});

todo.constant('USER_ROLES', {
  public: 'public_role'
});

todo.constant('SERVER_URL_AUTH', 'http://localhost:3030/authenticate');
todo.constant('SERVER_URL_API', 'http://localhost:3030/api');

todo.run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
  $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {

    if ('data' in next && 'authorizedRoles' in next.data) {
      var authorizedRoles = next.data.authorizedRoles;
      if (!AuthService.isAuthorized(authorizedRoles)) {
        event.preventDefault();
        $state.go($state.current, {}, {reload: true});
        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
      }
    }

    if (!AuthService.isAuthenticated()) {
      if (next.name !== 'login') {
        event.preventDefault();
        $state.go('login');
      }
    }
  });
});

todo.factory('HttpInterceptor',
function ($rootScope, $q, HTTP_EVENTS) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        500: HTTP_EVENTS.serverError,
        404: HTTP_EVENTS.notFound
      }[response.status], response);
      return $q.reject(response);
    }
  }
})
.config(function ($httpProvider) {
  $httpProvider.interceptors.push('HttpInterceptor');
});
