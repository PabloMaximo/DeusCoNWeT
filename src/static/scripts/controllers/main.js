/**
 * @ngdoc function
 * @name pruebaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pruebaApp
 */


angular.module('picbit').controller('MainCtrl', function ($scope, $location, $timeout, $backend,$http) {
  'use strict';
  $scope.status = false;
  $scope.status1 = true;
  $scope.domain = $location.host();
  $scope.shadow = false;
  $scope.sended = false;



  $scope.logged = function (e) {
    $scope.$apply(function () {


      $scope.hidePopup();// escondemos el popup y cambiamos la direccion del usuario
      if (e.detail.redSocial === 'twitter') {
        if ($location.$path.indexOf("profile") !== -1) {
          return
        }
        $location.path('/user/' + e.detail.redSocial + '_' + e.detail.userId);
      } else if (e.detail.redSocial === 'googleplus') { // Comprobamos si es google para buscar el id
        var xhr = new XMLHttpRequest();
        var uri = 'https://www.googleapis.com/plus/v1/people/me?access_token=' + e.detail.token;
        xhr.open("GET", uri, true);
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
            $scope.$apply(function () {
              var response = JSON.parse(xhr.responseText);
              $scope.sendData(e.detail.token, response.id, e.detail.redSocial);
              if ($location.$$path.indexOf("profile") !== -1) {
                return;
              }
              $location.path('/user/' + e.detail.redSocial + '_' + response.id);
            });
          } else if (xhr.readyState === 4) {
            console.info("Algo fue mal en google");
          }
        };
        xhr.send();
      } else {// mandamos los datos si ya los tenemos
        $scope.sendData(e.detail.token, e.detail.userId, e.detail.redSocial);
        if ($location.$$path.indexOf("profile") != -1){
          return
        }
        $location.path('/user/'+e.detail.redSocial+'_'+e.detail.userId);
      }
      // cambiamos el botton
      var button = document.querySelector('#nameId');
      // Selecionar el nombre del usuario
      button.innerHTML="Desconectar"
      // Seleccionar la imagen del perfin
      // button.src=""
      // Cambiamos a la funcion de logout
      $scope.status = true;
      $scope.status1 = false;
    });

    $scope.sendData = function (token, tokenId, redSocial) {
      var request, uri, params;
      uri = 'http://test-frontend.example-project-13.appspot.com/api/oauth/' + redSocial;    
      params = "token_id=" + tokenId + "&access_token=" + token + "&action=login";
      request = {
        method:"post",
        url: uri, 
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: params
      }
      $http(request).error(function (data,status) {
        console.error('Error ' + status + ': no se enviaron datos al backend'); 
      });

    };

  };
  $scope.changeView = function(view){
    $location.hash('');
    $location.path(view); // path not hash
  };

  $scope.logout = function() {
    var button = document.querySelector('#nameId');
    // Selecionar el nombre del usuario
    button.innerHTML="Entrar";
    $scope.changeView('/');
    $scope.status = false;
    $scope.status1 = true;
  }
  /* Escuhas de los botones*/
  document.querySelector('body').addEventListener('google-logged', $scope.logged);
  document.querySelector('body').addEventListener('linkedin-logged', $scope.logged);
  document.querySelector('body').addEventListener('github-logged', $scope.logged);
  document.querySelector('body').addEventListener('instagram-logged', $scope.logged);
  document.querySelector('body').addEventListener('twitter-logged', $scope.logged);
  document.querySelector('body').addEventListener('facebook-logged', $scope.logged);
  document.querySelector('body').addEventListener('sof-logged', $scope.logged);

  $scope.popup = false;

  $scope.showPopup = function(e){
    if (!$scope.status) {
      $scope.popup = true;
      $scope.shadow = true;
    } else if (e.target.id !== 'eButton') {
      console.info(e);
      $scope.logout();
    }
  };
  $scope.hidePopup = function(){
    $scope.popup = false;
    $scope.shadow = false;
  };

});
