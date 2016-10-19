angular.module('AppController', []).controller('AppController',
function ($scope, $state, $ionicPopup, AuthService, AUTH_EVENTS, HTTP_EVENTS) {
  $scope.username = AuthService.username();
  $scope.setCurrentUsername = function(name) {
    $scope.username = name;
  };
  
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

  $scope.$on(HTTP_EVENTS.serverError, function (event) {
    var alertPopup = $ionicPopup.alert({
      title: 'Erro de servidor!',
      template: 'Sua requisição não pode ser atendida. ' +
        'Por favor, tente novamente mais tarde. Se o problema persistir entre em contato conosco.'
    });
  });

  $scope.$on(HTTP_EVENTS.notFound, function (event) {
    var alertPopup = $ionicPopup.alert({
      title: 'Recurso não encontrado!',
      template: 'O recurso que você tentou acessar não existe ou não está ' +
        'disponível. Por favor, tente novamente mais tarde.'
    });
  });
});
