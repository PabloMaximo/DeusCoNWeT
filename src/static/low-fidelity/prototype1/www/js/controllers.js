// controllers of the application
angular.module('prototype1.controllers', [])

  .controller('MainCtrl', function($scope, $state, $ionicSideMenuDelegate, $ionicHistory){
    $scope.stateApp = {
      logged: false
    }
    $scope.dashstate = {
      _components: [],
      activeComponent: "",
      isEmpty: function(){return this._components.length == 0 ? true : false},
      getAddedComponents: function(){return this._components},
      addComponent: function(cmp){
        if(this.isEmpty()){
          this.activeComponent = cmp.name;
        }
        this._components.push(cmp);
      },
      getNumberOfComponents: function(){return this._components.length}
    }

    $scope.transitions = {
      login: function(){
        $state.go('login');
      },
      logout: function(){
        $scope.stateApp.logged = false;
        $state.go('login');
      },
      dash: function(){
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
        //$ionicHistory.currentView($ionicHistory.backView())
        $scope.stateApp.logged = true;
        if($ionicHistory.currentStateName() == "login") {
          $state.go('dashboard', {}, {reload: true, location: 'replace'});
        }else{
          $state.go('dashboard', {}, {reload: true});
        }
      },
      components: function(){
        $state.go('components');
      }
    }
    $scope.showPicBitSiteMenu = function(){
      $ionicSideMenuDelegate.toggleLeft()
    };
  })
  .controller('HomeCtrl', function($scope){

  })
  .controller('LoginCtrl', function($scope, $state){

  })
  .controller('DashCtrl', function($scope,$state){
  })
  .controller('ComponentsCtrl',function($scope, Components){
    $scope.components = Components.all();
    $scope.countAvailables = Components.countAvailables();
    $scope.addComponent = function(name){
      $scope.transitions.dash()
      var comp = Components.get(name);
      Components.inUse(name)
      $scope.dashstate.addComponent(comp);
      Components.setCountAvailable();
      $scope.countAvailables = Components.countAvailables();
    }
  })
