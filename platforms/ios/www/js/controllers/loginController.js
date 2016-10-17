angular.module('LoginController', []).controller('LoginController',
function ($scope, $state, $ionicPopup, AuthService){
  $scope.data = {};

  $scope.login = function(data) {
    AuthService.login(data.username, data.password).then(function(authenticated) {
      $state.go('main.tasks', {}, {reload: true});
      $scope.setCurrentUsername(data.username);
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'Falha no login!',
        template: 'Por favor, verifique suas credenciais!'
      });
    });
  };
});
