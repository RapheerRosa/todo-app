var TaskController = angular.module('TasksController', []);

TaskController.controller('TasksListController',
function ($scope, $controller, $state, AuthService,
TasksService, $ionicActionSheet, $ionicPopup) {

  $controller('ParentController', {$scope: $scope});

  $scope.tasks = [];
  $scope.newTask = {
    title: '',
    description: ''
  };
  $scope.counters = {
    done: 0,
    notDone: 0
  };

  function calculateCounters() {
    $scope.counters.done = 0;
    $scope.counters.notDone = 0;
    angular.forEach($scope.tasks, function(task) {
      if (task.done) $scope.counters.done++;
      else $scope.counters.notDone++;
    });
  }

  function saveNewTask() {
    if ($scope.newTask.title != '') {
      TasksService.createTask($scope.newTask)
        .then(function () {
          $scope.getTasks();
        });
      $scope.newTask = {
        title: '',
        description: ''
      };
    }
  }

  $scope.getTasks = function () {
    TasksService.getTasks()
      .then(function (response) {
        $scope.tasks = response;
        calculateCounters();
      });
  }

  $scope.toggleTask = function (task) {
    TasksService.toggleTask(task._id)
      .then(function (response) {
        task.done = !task.done;
        calculateCounters();
      });
  }

  $scope.taskSettings = function (task) {
    var popup = $ionicActionSheet.show({
      buttons: [
        { text: '<b>Editar</b>' }
      ],
      destructiveText: 'Apagar',
      destructiveButtonClicked: function () {
        var confirmPopup = $ionicPopup.confirm({
          title: 'Apagar a tarefa',
          template: 'Tem certeza que quer apagar a tarefa?'
        });

        confirmPopup.then(function(res) {
          if(res) {
            // TODO: chamada do service que apaga a task
            popup();
          } else {
            popup();
          }
        });
      },
      titleText: 'Opções da tarefa',
      cancelText: 'Cancelar',
      buttonClicked: function(index) {
        switch (index) {
          case 1:
            // TODO: editar a tarefa
            break;
          default:
            return true;
            break;
        }
      }
    });
  }

  $scope.addTask = function () {
    $ionicPopup.show({
        template: '<div class="list list-inset">' +
          '<label class="item item-input">' +
            '<input type="text" placeholder="Título" ng-model="newTask.title">' +
          '</label>' +
          '<label class="item item-input">' +
            '<input type="text" placeholder="Descrição" ng-model="newTask.description">' +
          '</label>' +
        '</div>',
       title: 'Nova tarefa',
       subTitle: 'Por favor, preencha as informações',
       scope: $scope,
       buttons: [
         { text: 'Cancelar' },
         {
           text: '<b>Salvar</b>',
           type: 'button-positive',
           onTap: function(e) {
             if (!$scope.newTask.title) {
               e.preventDefault();
             } else {
               return saveNewTask();
             }
           }
         }
       ]
     });
  }

  $scope.getTasks();
});

TaskController.controller('TaskEditController',
function () {

});
