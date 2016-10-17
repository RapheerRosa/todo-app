angular.module('TasksController', []).controller('TasksController',
function ($scope, AuthService, TasksService) {
  $scope.tasks = [];

  $scope.logout = function() {
    AuthService.logout();
    $state.go('login');
  };

  $scope.getTasks = function () {
    TasksService.getTasks()
      .then(function (data) {
        $scope.tasks = data;
      });
  }

  $scope.getTasks();
});
