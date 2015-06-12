angular.module('picbit')
  .controller('PrivacyController', ['$scope','$roouteParams','$timeout', function ($scope, $routeParams,$timeout) {
    'use strict';
    $scope.mailTo = function () {

      var link = "mailto:deus@conwet.com"
      + "?cc=deus@conwet.com"
      + "&subject=" + "beta"
      + "&body=" +document.querySelector('#mensaje').value;
      window.location.href = link;
    }
  }]);