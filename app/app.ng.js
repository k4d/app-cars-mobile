console.info( 'Angular version', angular.version.full );

//	Angular App

let App = angular.module( 'CarsApp', ['ngRoute', 'ngResource'] );

App.config([ '$routeProvider', '$locationProvider', function( $routeProvider, $locationProvider ) {

	// $locationProvider.html5Mode({
	// 	enabled: true,
	// 	requireBase: false
	// });

	$routeProvider
		.when('/',{
			templateUrl: 'views/list.html',
			controller: 'IndexCtrl'
		})
		.when('/list',{
			templateUrl: 'views/list.html',
			controller: 'IndexCtrl'
		})
		.when('/cars/:id',{
			templateUrl: 'views/details.html',
			controller: 'DetailsCtrl'
		})
		.otherwise({
			retirectTo: '/'
		});
}]);

App.factory('Cars', [
	'$resource', function( $resource ) {
		return $resource( '../data/cars.json', {} )
	}
]);

App.filter( 'filterSearch', function(){
	return function( item ) {
		return item;
	};
});

App.controller( 'IndexCtrl', [ '$scope', '$http', '$location', 'Cars', function( $scope, $http, $location, Cars ) {

	$scope.cars = Cars.query();

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

App.controller( 'DetailsCtrl', [ '$scope', '$http', '$location', '$routeParams', function( $scope, $http, $location, $routeParams ) {

	$scope.id = $routeParams.id;

	$http.get( '../data/cars.json' )
		.success(( data, status, headers, config ) => {
			$scope.cars = data;
			$scope.car = $scope.cars[$scope.id];
		})
		.error(( data, status ) => {
			console.log( 'Error status: ', status );
		});
}]);