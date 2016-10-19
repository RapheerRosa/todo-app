angular.module('Routes', [])
.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('login', {
      url: 'login',
      templateUrl: 'views/login.html',
      controller: 'LoginController'
    })

    .state('main', {
      url: '/',
      abstract: true,
      templateUrl: 'views/main.html'
    })

        .state('main.tasks', {
          url: '/main/tasks',
          views: {
            'tasks-tab': {
              templateUrl: 'views/modules/tasks/main.html',
              controller: 'TasksListController'
            }
          }
        })

        .state('main.tasks.edit', {
          url: '/main/tasks/edit',
          views: {
            'tasks-tab': {
              templateUrl: 'views/modules/tasks/edit.html',
              controller: 'TasksEditController'
            }
          }
        })

        .state('main.profile', {
          url: '/main/profile',
          views: {
            'profile-tab': {
              templateUrl: 'views/modules/profile/main.html',
              controller: 'ProfileController'
            }
          }
        });

   $urlRouterProvider.otherwise(function ($injector, $location){
    var $state = $injector.get("$state");
    $state.go("main.tasks");
   });
 });
