angular.module('picbit.controllers', [])

.controller('MainCtrl', function($scope, $state, $q, UserService, $ionicLoading, $ionicActionSheet, $ionicSideMenuDelegate){
	// This is the success callback from the login method
  var fbLoginSuccess = function(response) {
  	console.log(JSON.stringify(response))
    if (!response.authResponse){
      fbLoginError("Cannot find the authResponse");
      return;
    }

    var authResponse = response.authResponse;

    getFacebookProfileInfo(authResponse)
    .then(function(profileInfo) {
      // For the purpose of this example I will store user data on local storage
      UserService.setUser({
        authResponse: authResponse,
				userID: profileInfo.id,
				name: profileInfo.name,
				email: profileInfo.email,
        picture : "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
      });
      $ionicLoading.hide();
      $state.go('profile');
    }, function(fail){
      // Fail get profile info
      console.log('profile info fail', fail);
    });
  };

  // This is the fail callback from the login method
  var fbLoginError = function(error){
    console.log('fbLoginError', error);
    $ionicLoading.hide();
  };

  // This method is to get the user profile info from the facebook api
  var getFacebookProfileInfo = function (authResponse) {
    var info = $q.defer();

    facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
      function (response) {
		console.log(response);
        info.resolve(response);
      },
      function (response) {
		console.log(response);
        info.reject(response);
      }
    );
    return info.promise;
  };

  //This method is executed when the user press the "Login with facebook" button
  $scope.facebookSignIn = function() {  	
    facebookConnectPlugin.getLoginStatus(function(success){
    	console.log(JSON.stringify(success))
      if(success.status === 'connected'){
        // The user is logged in and has authenticated your app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed request, and the time the access token
        // and signed request each expire
        console.log('getLoginStatus', success.status);

    		// Check if we have our user saved
    		var user = UserService.getUser('facebook');

    		if(!user.userID){
					getFacebookProfileInfo(success.authResponse)
					.then(function(profileInfo) {
						// For the purpose of this example I will store user data on local storage
						UserService.setUser({
							authResponse: success.authResponse,
							userID: profileInfo.id,
							name: profileInfo.name,
							email: profileInfo.email,
							picture : "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
						});

						$state.go('profile');
					}, function(fail){
						// Fail get profile info
						console.log('profile info fail', fail);
					});
				}else{
					$state.go('profile');
				}
      } else {
        // If (success.status === 'not_authorized') the user is logged in to Facebook,
				// but has not authenticated your app
        // Else the person is not logged into Facebook,
				// so we're not sure if they are logged into this app or not.

				console.log('getLoginStatus', success.status);

				$ionicLoading.show({
          template: 'Logging in...'
        });

				// Ask the permissions you need. You can learn more about
				// FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
        var test = facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);        
      }
    });
  };

  $scope.showLogOutMenu = function() {
		var hideSheet = $ionicActionSheet.show({
			destructiveText: 'Logout',
			titleText: 'Are you sure you want to logout? This app is awsome so I recommend you to stay.',
			cancelText: 'Cancel',
			cancel: function() {},
			buttonClicked: function(index) {
				return true;
			},
			destructiveButtonClicked: function(){
				$ionicLoading.show({
				  template: 'Logging out...'
				});

        // Facebook logout
        facebookConnectPlugin.logout(function(){
          $ionicLoading.hide();
          $state.go('login');
        },
        function(fail){
          $ionicLoading.hide();
        });
			}
		});
	};

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
        console.log("COMPS: ",JSON.stringify(this._components))
    }else{        
      console.log("REMOVING: "+cmp.name)
      var index = this.getIndex(cmp.name);
      this._components.splice(index,1);
      if(this.isEmpty()){
        this.activeComponent = "";
      }           
      console.log("COMPS: ",JSON.stringify(this._components))
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

  $scope.selection = {
    twitter: false,
    instagram: false,
    github: false
  };
})
.controller('LoginCtrl', function($scope, $state, $ionicSideMenuDelegate){
	$ionicSideMenuDelegate.canDragContent(false) 
})
.controller('ProfileCtrl', function($scope, $state, UserService, $ionicActionSheet, $ionicLoading, $ionicNavBarDelegate, $ionicSideMenuDelegate){
	$ionicSideMenuDelegate.canDragContent(true) 
	$scope.user = UserService.getUser();
	$ionicNavBarDelegate.showBackButton(false);		
	$scope.showDashboard = function(){
		console.log("DASH");
		$state.go('dashboard');
	};
})

.controller('DashboardCtrl', function($scope, UserService, $state, $ionicNavBarDelegate){	
	$scope.user = UserService.getUser();
	$ionicNavBarDelegate.showBackButton(false);
	$scope.showComponents = function(){
		$state.go('components.list');
	}

  $scope.sortableOptions = {
    connectWith: '.connectedItemsExample .card'
  };

  $scope.showComponentsActives = function(name){
    console.log("NAME: ", name)
    switch(name){
      case 'twitter-timeline':
        $state.go('twitter')
      break;
      case 'github-events':
        $state.go('github')
      break;
      case 'instagram-timeline':                    
        $state.go('instagram')
      break;
      default:
      break;
    }
  }

})

.controller('ComponentsCtrl', function($scope,UserService,$state, $ionicNavBarDelegate, Components){
  
  $scope.addComponent = function(name){
    console.log("Name: ", name)
    switch(name){
      case 'twitter-timeline':
        $scope.selection.twitter = true;        
        $scope.dashstate.addComponent(Components.get(name))        
        $scope.dashstate.getComponent(name).checked = true;
      break;
      case 'github-events':
        $scope.selection.github = true;        
        $scope.dashstate.addComponent(Components.get(name))
        $scope.dashstate.getComponent(name).checked = true;
      break;
      case 'instagram-timeline':                    
        $scope.selection.instagram = true;        
        $scope.dashstate.addComponent(Components.get(name))
        $scope.dashstate.getComponent(name).checked = true;
      break;
      default:
      break;
    }
  }
  $scope.removeComponent = function(name){
    console.log(name)
    switch(name){
      case 'twitter-timeline':        
        var comp = $scope.dashstate.getComponent(name);
        $scope.dashstate.addComponent(comp) 
        comp.checked = false;               
        $scope.selection.twitter = false;        
      break;
      case 'github-events':        
        var comp = $scope.dashstate.getComponent(name);
        $scope.dashstate.addComponent(comp) 
        comp.checked = false;
        $scope.selection.github = false;        
      break;
      case 'instagram-timeline':        
        var comp = $scope.dashstate.getComponent(name);
        $scope.dashstate.addComponent(comp) 
        comp.checked = false;
        $scope.selection.instagram = false;      
      break;
      default:
      break;
    }
  }
  $scope.showDashboard = function(){
    console.log("DASH");
    $state.go('dashboard');
  };

})
.controller('InstagramCtrl', function($scope, $state){    

  var init = function(){
    $scope.myIndex = $scope.dashstate.getIndex('instagram-timeline');    
    $scope.thereIsLeft = ($scope.dashstate._components.length >= 2 && $scope.myIndex > 0)? true : false;  
    $scope.thereIsRight = ($scope.dashstate._components.length >= 2 && $scope.myIndex < $scope.dashstate._components.length - 1)? true : false;  
    console.log("Left: ",$scope.thereIsLeft);
    console.log("Right: ",$scope.thereIsRight);    
  };  
  $scope.$on('$ionicView.beforeEnter', function(){
    init();
  });
})
.controller('GithubCtrl', function($scope, $state){
  $scope.myIndex = $scope.dashstate.getIndex('github-events');
  $scope.thereIsLeft = ($scope.dashstate._components.length >= 2 && $scope.myIndex > 0)? true : false;
  $scope.thereIsRight = ($scope.dashstate._components.length >= 2 && $scope.myIndex < $scope.dashstate._components.length - 1)? true : false;
  console.log("Left: ",$scope.thereIsLeft);
  console.log("Right: ",$scope.thereIsRight);
})
.controller('TwitterCtrl', function($scope, $state){
  $scope.myIndex = $scope.dashstate.getIndex('twitter-timeline');
  $scope.thereIsLeft = ($scope.dashstate._components.length >= 2 && $scope.myIndex > 0)? true : false;
  $scope.thereIsRight = ($scope.dashstate._components.length >= 2 && $scope.myIndex < $scope.dashstate._components.length - 1)? true : false;
})
