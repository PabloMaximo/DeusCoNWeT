'use strict';

/**
 * @ngdoc function
<<<<<<< HEAD
 * @name pruebaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pruebaApp
 */

angular.module('PolymerBricks')
.controller('MainCtrl', function ($scope,$location,$timeout) {
	$scope.popup = false;
	
	$scope.showPopup = function(){
		$scope.popup = true;
	}
	$scope.hidePopup = function(){
		$scope.popup = false;
	}
});
