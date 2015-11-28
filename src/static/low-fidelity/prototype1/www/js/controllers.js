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
      getComponent: function(name){
        var index = this.getIndex(name);
        return this._components[index];
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
      },
      removeComponent: function(name){
        var index = this.getIndex(name);
        this._components.splice(index,1);
        if(this.isEmpty()){
          this.activeComponent = "";
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
        //$ionicHistory.currentView($ionicHistory.backView())
        $scope.stateApp.logged = true;
        if($ionicHistory.currentStateName() == "login") {
          $state.go('dashboard');
        }else{
          $state.go('dashboard');
        }
      },
      components: function(){
        $state.go('components');        
      },
      profile: function(){
        $state.go('profile');
      },
      aboutPicBit: function(){
        $state.go('aboutPicBit');
        $ionicSideMenuDelegate.toggleLeft();
      },
      aboutDeusConWet: function(){
        $state.go('aboutDeusConWet');
        $ionicSideMenuDelegate.toggleLeft();
      },
      team: function () {
        $state.go('team');
        $ionicSideMenuDelegate.toggleLeft();
      },
      police: function(){
        $state.go('police');
        $ionicSideMenuDelegate.toggleLeft();
      },
      back: function() {
        $ionicHistory.goBack();
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
  .controller('DashCtrl', function($scope, $ionicSideMenuDelegate, $ionicScrollDelegate, $ionicActionSheet,$ionicModal, Components){      

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
          $ionicScrollDelegate.scrollTop();
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
          $ionicScrollDelegate.scrollTop();
          console.log($scope.dashstate.activeComponent);
        }
      }else{
        return false;
      }
    }

    $ionicModal.fromTemplateUrl('templates/valoration.html',function($ionicModal){
      $scope.modal = $ionicModal;
    },{
      scope: $scope,
      animation: 'slide-in-up'
    })

    $scope.showAction = function(){
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          { text: 'Valorate' },           
        ],
        destructiveText: 'Delete components',
        titleText: 'Components options',
        cancelText: 'Cancel',
        cancel: function() {
          // add cancel code..
        },
        buttonClicked: function(index) {
          $scope.modal.show();
          return true;
        },
        destructiveButtonClicked: function(){
          Components.outUse($scope.dashstate.activeComponent)          
          $scope.dashstate.removeComponent($scope.dashstate.activeComponent);          
          //Components.setCountAvailable();
          $scope.countAvailables = Components.countAvailables();
          if(!$scope.dashstate.isEmpty()){
            $scope.dashstate.activeComponent = $scope.dashstate._components[0].name;
            console.log("ACTIVE NOW: "+ $scope.dashstate.activeComponent)
          }
          return true;
        }
      });    
    };    
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
  .controller('ProfileCtrl', function($scope){

  })
  .controller('PicBitCtrl', function($scope){
    
  })
  .controller('DeusCtrl', function($scope){
    
  })
  .controller('TeamCtrl', function($scope){
    
  })
  .controller('PoliceCtrl', function($scope){
    
  })
