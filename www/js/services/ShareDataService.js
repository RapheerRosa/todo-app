angular.module('ShareDataService', []).service('ShareDataService',
function () {
  var data = {};

  function getItem(key) {
    return data[key];
  }

  function setItem(key, value) {
    data[key] = value;
  }

  function removeItem(key) {
    delete data[key];
  }

  return {
    getItem: getItem,
    setItem: setItem,
    removeItem: removeItem
  };
});
