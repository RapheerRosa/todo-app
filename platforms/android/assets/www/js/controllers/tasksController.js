angular.module('TasksController', []).controller('TasksController',
function ($scope) {
  $scope.logout = function() {
    AuthService.logout();
    $state.go('login');
  };
});
