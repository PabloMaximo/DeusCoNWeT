// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('picbit', ['ionic', 'picbit.controllers', 'picbit.services','ionic-material', 'ionMdInput', 'ngAnimate', 'ui.sortable'])

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

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider){
  $ionicConfigProvider.views.maxCache(5);

  // note that you can also chain configs
  //$ionicConfigProvider.backButton.text('Go Back').icon('ion-chevron-left');
  $ionicConfigProvider.tabs.position('bottom'); // other values: top
  $stateProvider

  .state('login',{
    url:'/login',
    templateUrl:'templates/login.html',
    controller: 'LoginCtrl'
  })
  .state('profile',{
    url: '/profile',
    templateUrl: 'templates/profile.html',
    controller: 'ProfileCtrl'
  })
  .state('dashboard', {
    url: '/dashboard',
    templateUrl: 'templates/dashboard.html',
    controller: 'DashboardCtrl'
  })
  .state('components',{
    abstract: true,
    url: '/components',
    templateUrl: 'templates/components.html',    
    controller: 'ComponentsCtrl'
  })
    .state('components.list',{
      url: '/list',
      views: {
        'list-tab': {
          templateUrl: 'templates/componentsList.html',          
        }
      }            
    })
    .state('components.square',{
      url: '/square',
      views: {
        'square-tab':{
          templateUrl: 'templates/componentsSquare.html',          
        }
      }      
    })
  .state('twitter',{
    url: '/twitter-component',
    templateUrl: 'templates/twitterComponent.html',
    Controller: 'TwitterCtrl'
  })
  .state('instagram', {
    url: '/instagram-component',
    templateUrl: 'templates/instagramComponent.html',
    Controller: 'InstagramCtrl'
  })
  .state('github', {
    url: '/githubComponents',
    templateUrl: 'templates/githubComponent.html',
    Controller: 'GithubCtrl'
  })  

  $urlRouterProvider.otherwise('/profile')
})
