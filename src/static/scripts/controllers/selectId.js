angular.module('picbit').controller('selectIdCtrl', function ($scope,$backend) {

  $scope.sendUsername = function (event,value) {
    var callback, errorCallback;
    callback = function () {
      $scope.changeView('/profile/');
    };
    if (event.type === "keyup") {
      if ( event.which === 13 && (value !== undefined && value !== '')) {
        $backend.sendUsername(value);
      }

    } else if (event.type === "click") {
      $backend.sendUsername(value);
    };
  }
});