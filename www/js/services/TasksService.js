angular.module('TasksService', []).service('TasksService',
function ($q, $http, SERVER_URL_API) {
  function getTasks() {
    return $q(function (resolve, reject) {
      $http.get(SERVER_URL_API + '/tasks')
        .then(function (response) {
          if (response.status === 200) resolve(response.data);
        });
    });
  }

  function toggleTask(id) {
    return $q(function (resolve, reject) {
      $http.put(SERVER_URL_API + '/task/' + id + '/toggle/done')
        .then(function (response) {
          if (response.status === 200) resolve(response.data);
        });
    });
  }

  function createTask(task) {
    return $q(function (resolve, reject) {
      $http.post(SERVER_URL_API + '/tasks', task)
        .then(function (response) {
          if (response.status === 201) resolve(response.data);
        });
    });
  }

  return {
    getTasks: getTasks,
    toggleTask: toggleTask,
    createTask: createTask
  }
});
