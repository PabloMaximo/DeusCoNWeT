// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('prototype2', ['ionic', 'prototype2.controllers', 'prototype1.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  //Promises
  .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'HomeCtrl'
  })  
  .state('components',{
    url: '/components',
    templateUrl: 'templates/components.html',
    controller: 'ComponentsCtrl'
  })
  .state('dashboard',{
    url: '/dashboard',
    templateUrl: 'templates/dashboard.html',
    controller: 'DashCtrl'
  })
  .state('team',{
    url: '/team', 
    templateUrl: 'templates/team.html',
    controller: 'TeamCtrl'
  })

  // DEFAULT ROUTE
  $urlRouterProvider.otherwise('/home');
});
