angular.module('prototype2.controllers', [])

//promises
.controller('MainCtrl', function($scope, $state, $ionicHistory, $ionicSideMenuDelegate, $ionicNavBarDelegate){
	var homeView = $ionicHistory.currentView();
	// user controll
	$scope.stateApp = {
      logged: false
    }	
    // dash controll
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
	//controll states
	$scope.transitions = {
		home: function(){
			$state.go('home');
		},
		dashboard: function(){			
			$ionicNavBarDelegate.showBackButton(false)
			$state.go('dashboard');
		},
		components: function(){
			$state.go('components');
		},
		// transitions to statics zones
		team: function(){		
			if($ionicHistory.currentView().name === 'dashboard'){
				homeView = $ionicHistory.currentView()
			}
			$ionicHistory.backView = homeView;						
			$ionicSideMenuDelegate.toggleRight();
			$state.go('team');
		},
		aboutPicBit: function(){
			if($ionicHistory.currentView().name === 'dashboard'){
				homeView = $ionicHistory.currentView()
			}
			$ionicHistory.backView = homeView;
			$ionicSideMenuDelegate.toggleRight();
			$state.go('aboutPicBit');
		},
		aboutDeusConwet: function(){
			if($ionicHistory.currentView().name === 'dashboard'){
				homeView = $ionicHistory.currentView()
			}
			$ionicHistory.backView = homeView;
			$ionicSideMenuDelegate.toggleRight();
			$state.go('aboutDeusConwet');
		},
		police: function(){
			if($ionicHistory.currentView().name === 'dashboard'){
				homeView = $ionicHistory.currentView()
			}
			$ionicHistory.backView = homeView;
			$ionicSideMenuDelegate.toggleRight();
			$state.go('police');
		}
	}

	//Control menu
	$scope.showPicBitSiteMenu = function(){
		$ionicSideMenuDelegate.toggleRight();
	}
})
.controller('HomeCtrl', function($scope){
	
})
.controller('DashCtrl', function($scope, $ionicNavBarDelegate){
	$ionicNavBarDelegate.showBackButton(false)
})
.controller('ComponentsCtrl', function($scope,Components,$ionicNavBarDelegate){
	$ionicNavBarDelegate.showBackButton(true)
	$scope.components = Components.all();
})
.controller('TeamCtrl', function($scope, $ionicNavBarDelegate){
	$ionicNavBarDelegate.showBackButton(true)
})