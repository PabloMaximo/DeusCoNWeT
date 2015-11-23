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
        console.log("ADDING: "+cmp.name)
        if(this.isEmpty()){
          this.activeComponent = cmp.name;
        }
        this._components.push(cmp);
      },
      getNumberOfComponents: function(){return this._components.length},
      getIndex: function(name){
        console.log("searching index of: "+ name);
        //var index = 0;
        for(var obj in this._components){
          if(this._components[obj].name == name){
            console.log(obj)
            return (obj*1);
          }
        }
      }
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
  .controller('DashCtrl', function($scope, $ionicSideMenuDelegate){
    $scope.disable = function(){
      $ionicSideMenuDelegate.canDragContent(false);
    }
    $scope.advanceActive = function(){
      var nums = $scope.dashstate.getNumberOfComponents();
      console.log("ACTIVE COMPONENT: "+$scope.dashstate.activeComponent)
      var currentIndex = $scope.dashstate.getIndex($scope.dashstate.activeComponent);
      console.log("TOTAL: "+nums);
      if(nums > 1){
        console.log("CURRENT: "+currentIndex)
        if(currentIndex < nums - 1){
          $scope.dashstate.activeComponent = $scope.dashstate._components[currentIndex+1].name;
          console.log($scope.dashstate.activeComponent);
        }
      }else{
        return false;
      }
    }
    $scope.backActive = function(){
      var nums = $scope.dashstate.getNumberOfComponents();
      console.log("ACTIVE COMPONENT: "+$scope.dashstate.activeComponent)
      var currentIndex = $scope.dashstate.getIndex($scope.dashstate.activeComponent);
      console.log("TOTAL: "+nums);
      if(nums > 1){
        console.log("CURRENT: "+currentIndex)
        if(currentIndex > 0){
          $scope.dashstate.activeComponent = $scope.dashstate._components[currentIndex-1].name;
          console.log($scope.dashstate.activeComponent);
        }
      }else{
        return false;
      }
    }
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
