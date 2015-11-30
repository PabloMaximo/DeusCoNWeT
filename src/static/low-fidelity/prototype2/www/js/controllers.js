angular.module('prototype2.controllers', [])

//promises
.controller('MainCtrl', function($scope, $state, $ionicHistory, $ionicSideMenuDelegate, $ionicNavBarDelegate, Components){
	var homeView = $ionicHistory.currentView();
	var componentsView = null;
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
      //alredyAdded: function(cmp){return this._components.indexOf(cmp) >= 0 ? true : false},
      addComponent: function(cmp){      	
      	if(!cmp.checked){      		
        	console.log("ADDING: "+cmp.name)
        	if(this.isEmpty()){
          		this.activeComponent = cmp.name;
        	}
        	this._components.push(cmp);
    	}else{    		
    		var index = this.getIndex(cmp.name);
	        this._components.splice(index,1);
	        if(this.isEmpty()){
		        this.activeComponent = "";
	        }		        
    	}
    	console.log("COMP: "+JSON.stringify(cmp.checked));
      },
      getComponent: function(name){
        var index = this.getIndex(name);
        return this._components[index];
      },
      getNumberOfComponents: function(){return this._components.length},
      getIndex: function(name){        
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
			$ionicNavBarDelegate.showBackButton(true)
			$state.go('dashboard');
		},
		components: function(){
			if($ionicHistory.currentView().name == 'instagram-timeline' || $ionicHistory.currentView().name == 'github-events' ||
				$ionicHistory.currentView().name == 'twitter-timeline'){
				$state.go('components',{},{back:false,reload:true});	
			}
			$state.go('components');
			$scope.componentsView = $ionicHistory.currentView();
			console.log(JSON.stringify($scope.componentsView));
		},
		component: function(name){
			switch(name){
				case 'twitter-timeline':
					$state.go('twitter-timeline');
				break;
				case 'instagram-timeline':
					$state.go('instagram-timeline');
				break;
				case 'github-events':
					$state.go('github-events');
				break;
				default:
				break;
			}
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
		aboutDeusConWet: function(){
			console.log("ASDF")
			if($ionicHistory.currentView().name === 'dashboard'){
				homeView = $ionicHistory.currentView()
			}
			$ionicHistory.backView = homeView;
			$ionicSideMenuDelegate.toggleRight();
			$state.go('aboutDeusConWet');
		},
		police: function(){
			if($ionicHistory.currentView().name === 'dashboard'){
				homeView = $ionicHistory.currentView()
			}
			$ionicHistory.backView = homeView;
			$ionicSideMenuDelegate.toggleRight();
			$state.go('police');
		},
		profile: function(){
			if($ionicHistory.currentView().name === 'dashboard'){
				homeView = $ionicHistory.currentView()
			}
			$ionicHistory.backView = homeView;
			$ionicSideMenuDelegate.toggleRight(false);
			$state.go('profile');	
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
	$ionicNavBarDelegate.showBackButton(true);
	// components
	$scope.components = Components.all();		
})
.controller('TeamCtrl', function($scope, $ionicNavBarDelegate){
	$ionicNavBarDelegate.showBackButton(true)
})
.controller('GithubCtrl', function($scope, $ionicModal, $ionicActionSheet, $ionicHistory, Components){
	$scope.valoration = {      
        usability: 0,
        completeness: 0,
        efficiency: 0,
        effectivity: 0,
        simplicity: 0,
    }

    // modal view
    $ionicModal.fromTemplateUrl('templates/valoration.html',function($ionicModal){
      $scope.modal = $ionicModal;
    },{
      scope: $scope,
      animation: 'slide-in-up'
    })

    $scope.showAction = function(){
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          { text: 'Valora el componente' },           
        ],
        destructiveText: 'Borrar componente',
        titleText: 'Opciones del componente',
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
          $scope.transitions.dashboard()
          return true;          
        }
      });    
    };     
})
.controller('TwitterCtrl', function($scope, $ionicModal, $ionicActionSheet, $ionicHistory, Components){
	$scope.valoration = {      
	    usability: 0,
	    completeness: 0,
	    efficiency: 0,
	    effectivity: 0,
	    simplicity: 0,
  	}	
  	// modal view
   $ionicModal.fromTemplateUrl('templates/valoration.html',function($ionicModal){
      $scope.modal = $ionicModal;
    },{
      scope: $scope,
      animation: 'slide-in-up'
    })

    $scope.showAction = function(){
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          { text: 'Valora el componente' },           
        ],
        destructiveText: 'Borrar componente',
        titleText: 'Opciones del componente',
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
          $scope.transitions.dashboard()
          return true;          
        }
      });    
    };     
})
.controller('InstagramCtrl', function($scope, $ionicModal, $ionicActionSheet, $ionicHistory, Components){
	$scope.valoration = {      
	    usability: 0,
	    completeness: 0,
	    efficiency: 0,
	    effectivity: 0,
	    simplicity: 0,
  	}	
  	// modal view
    $ionicModal.fromTemplateUrl('templates/valoration.html',function($ionicModal){
      $scope.modal = $ionicModal;
    },{
      scope: $scope,
      animation: 'slide-in-up'
    })

    $scope.showAction = function(){
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          { text: 'Valora el componente' },           
        ],
        destructiveText: 'Borrar componente',
        titleText: 'Opciones del componente',
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
          $scope.transitions.dashboard()
          return true;          
        }
      });    
    };   
})