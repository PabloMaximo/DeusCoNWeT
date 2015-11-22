// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('prototype1', ['ionic', 'prototype1.controllers', 'prototype1.services'])

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
    // definition of states on the prototype
    $stateProvider
      // promises
      .state('home', {
        url: '/home',
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      })
      .state('login',{
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
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



    // DEFAULT ROUTE
    // in case don't get other rout or error redirect to
    $urlRouterProvider.otherwise('/home');
  });