	'use strict';

	/**
	 * @ngdoc function
	 * @name pruebaApp.controller:AboutCtrl
	 * @description
	 * # AboutCtrl
	 * Controller of the pruebaApp
	 */

	angular.module('PolymerBricks')
	.controller('SearchCtrl', function ($scope) {

		$scope.orderBy='asc';
		$scope.sortBy='name';
		$scope.webComponents = $scope.$parent.webComponents;

		$scope.setSort = function (sortBy) {
			$scope.sortBy=sortBy;
			getAllComponent($scope.orderBy,$scope.sortBy);
		};

		$scope.setOrder = function () {
			if ($scope.orderBy ==='des'){
				$scope.orderBy = 'asc';
			} else {
				$scope.orderBy = 'des';
			}
		};

		$scope.changeList = function (sortBy) {
			$scope.setOrder();
			$scope.setSort(sortBy);
		};

		$scope.init = function (){
			var callback = function(response) {

				$scope.$apply(function() {
					$scope.webComponents = response;
					$scope.makeTodos();
					$scope.$watch('currentPage + numPerPage', function() {
						var begin = (($scope.currentPage - 1) * $scope.numPerPage)
						, end = begin + $scope.numPerPage;

						$scope.filteredTodos =$scope.todos.slice(begin, end);
					});


				});
			};
			getAllComponents($scope.orderBy,$scope.sortBy,callback);
		};

		$scope.filteredTodos = []
		,$scope.currentPage = 1
		,$scope.numPerPage = 1
		,$scope.maxSize = 3;

		$scope.todos = [];
		var i;
		$scope.makeTodos = function() {
			for (i=0;i<$scope.webComponents.length;i++) {
				$scope.todos.push($scope.webComponents[i]);
			}
		};

		$scope.numPages = function () {
			return Math.ceil($scope.todos.length / $scope.numPerPage);
		};


	});
