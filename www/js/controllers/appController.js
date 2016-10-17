angular.module('AppController', []).controller('AppController',
function ($scope, $state, $ionicPopup, AuthService, AUTH_EVENTS) {
  $scope.username = AuthService.username();

  $scope.$on(AUTH_EVENTS.notAuthorized, function(event) {
    var alertPopup = $ionicPopup.alert({
      title: 'Não Autorizado!',
      template: 'Você não tem permissões para acessar esse recurso.'
    });
  });

  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('login');
    var alertPopup = $ionicPopup.alert({
      title: 'Sessão Perdida!',
      template: 'Por favor, faça seu login novamente.'
    });
  });

  $scope.setCurrentUsername = function(name) {
    $scope.username = name;
  };
});
