angular.module('starter.controllers', [])

.controller('MainCtrl', function($scope, $ionicSideMenuDelegate, $state ){
    $scope.toggleRight = function() {
      $ionicSideMenuDelegate.toggleRight();
    };
    $scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
    };
    $scope.items = [
      {text: 'About Picbit', icon: ' ', goTo: 'goToLogin()'},
      {text: 'DeusConWet Team', icon: '', goTo: 'goToTeam()'},
    ];
    $scope.goToLogin = function(){$state.go('login')};
    $scope.goToTeam = function(){$state.go('team')}
    $scope.goToDashboard = function(){$state.go('dashboard')}
  })
.controller('homeCtrl', function($scope,$state) {

  })

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('DashboardCtrl', function($scope, $stateParams,Components) {
    $scope.dashSt = {
      components: [],
      isEmpty: true
    };
    $scope.addComponentToDashboard = function(id){
      console.log("adding")
      $scope.dashSt.components.push(Components.get(id));
      console.log($scope.dashSt.components);
      if($scope.dashSt.isEmpty){
        $scope.dashSt.isEmpty = false;
      }
      $scope.$apply()
    }
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
