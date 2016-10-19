angular.module('ParentController', []).controller('ParentController',
function ($scope, $state, AuthService) {
  $scope.logout = function() {
    AuthService.logout();
    $state.go('login');
  };
});
