console.info( 'Angular version', angular.version.full );

//	Angular App

let App = angular.module( 'CarsApp', ['ngRoute', 'ngResource'] );

App.run( function( $rootScope ) {
	$rootScope.hey = 'Yoh';
});

App.constant( 'config', {} );

App.config([ '$routeProvider', '$locationProvider', function( $routeProvider, $locationProvider ) {

	// $locationProvider.html5Mode({
	// 	enabled: true,
	// 	requireBase: false
	// });

	$routeProvider
		.when('/',{
			templateUrl : 'views/list.html',
			controller : 'IndexCtrl'
		})
		.when('/list',{
			templateUrl : 'views/list.html',
			controller : 'IndexCtrl'
		})
		.when('/cars/:id',{
			templateUrl : 'views/details.html',
			controller : 'DetailsCtrl'
		})
		.otherwise({
			retirectTo : '/'
		});
}]);

App.factory( 'Cars', [
	'$resource', function( $resource ) {
		return $resource( '../data/:path.:format', {
			path : 'cars',
			format : 'json',
			apiKey : 'carsKey'
		})
	}
]);

App.directive( 'customTitle', function() {
	return {
		restrict : 'E',
		scope : {},
		// template : '<h3>Hello, Custom Title</h3>',
		templateUrl : 'views/custom.html'
	};
});

App.filter( 'filterSearch', function(){
	return function( item ) {
		return item;
	};
});

App.controller( 'IndexCtrl', [ '$rootScope', '$scope', '$http', '$location', 'Cars', function( $rootScope, $scope, $http, $location, Cars ) {

	Cars.query( {}, function ( data ) {
		$scope.cars = data;
	});

	$scope.search = '';

	$scope.$watch( 'search', () => {
		console.log( `Watch value: ${$scope.search}` );
	});

	$scope.filter = function ( value, index, array ) {
		if ( $scope.search.length >= 2 ) {
			return value.brand.toLowerCase() === $scope.search.toLowerCase();
		} else {
			return value;
		}
	};

	$scope.orderField = null;
	$scope.orderReverse = true;

	$scope.orderByField = function ( field ) {
		$scope.orderReverse = ($scope.orderField === field) ? !$scope.orderReverse : false;
		$scope.orderField = field;
	};

}]);

App.controller( 'DetailsCtrl', [ '$rootScope', '$scope', '$http', '$location', '$routeParams', 'Cars', function( $rootScope, $scope, $http, $location, $routeParams, Cars ) {

	Cars.query( {}, function ( data ) {
		$scope.cars = data;
 		$scope.car = $scope.cars[$routeParams.id];
	});
}]);