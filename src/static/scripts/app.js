(function (document) {

  'use strict';
  /**
	 * @ngdoc overview
	 * @name picbit
	 * @description
	 * # PicBit
	 *
	 * Main module of the application.
	*/
  var app = angular
  .module('picbit', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ng-polymer-elements'
  ]);
  app.config(function ($locationProvider, $routeProvider,$httpProvider) {
    $httpProvider.defaults.withCredentials = true;
    $routeProvider
    /* Español */
      .when('/', {
      templateUrl: 'views/landingPage.html',
      controller: 'LandingController'
    })
      .when('/user/:userId', {
      templateUrl: 'views/userHome.html',
      controller: 'UserHomeController',
      resolve: {
        auth: ["$q", "$cookie", function($q, $cookie){

          var session = $cookie.get('session');

          if (session) {
            return $q.when(session);
          } else {
            return $q.reject({authenticated: false})
          }
        }]
      }
    })
      .when('/about', {
      templateUrl: 'views/about.html',
      controller: 'AboutController'
    })
      .when('/contact', {
      templateUrl: 'views/contact.html',
      controller: 'ContactController'
    })
      .when('/user/:userId/profile', {
      templateUrl: 'views/profile.html',
      controller: 'ProfileController',
      /* Para poder editar el perfil en localhost
    resolve: {
        auth: ["$q", "$cookie", function($q, $cookie){

          var session = $cookie.get('session');

          if (session) {
            return $q.when(session);
          } else {
            return $q.reject({authenticated: false})
          }
        }]
      }*/
    })
      .when('/privacy',{
      templateUrl: 'views/privacy.html',
      controller: 'PrivacyController'
    })
    .when('/selectId', {
      templateUrl: 'views/selectId.html',
      controller: 'selectIdCtrl'
    })
    /* Por defecto */
      .otherwise({redirectTo: '/'})
    ;
    $locationProvider.html5Mode(true)
  });

  app.run(["$rootScope", "$location", function($rootScope, $location) {
    $rootScope.$on("$routeChangeError", function(event, current, previous, eventObj) {
      if (eventObj.authenticated === false) {
        $location.path("/");
      }
    });
  }]);
})(wrap(document));
