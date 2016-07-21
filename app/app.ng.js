console.info( 'Angular version', angular.version.full );

//	Angular App

let App = angular.module( 'CarsApp', ['ngRoute'] );

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

App.controller( 'IndexCtrl', [ '$scope', '$http', '$location', function( $scope, $http, $location ) {

	$http.get( '../data/cars.json' )
		.success(( data, status, headers, config ) => {
			$scope.cars = data;
			// console.log( 'status', status );
			// console.log( 'headers', headers );
			// console.log( 'config', config );
			console.info( $scope.cars );
		})
		.error(( data, status ) => {
			console.log("Error status : " + status);
		});

	$scope.search = '';

	$scope.$watch( 'search', () => {
		console.log( `Watch value: ${$scope.search}` );
	});

	$scope.filter = function ( item ) {
		if ( $scope.search.length >= 2 ) {
			return item.brand.toLowerCase() === $scope.search.toLowerCase();
		} else {
			return item;
		}
	}

}]);

App.controller( 'DetailsCtrl', [ '$scope', '$http', '$location', '$routeParams', function( $scope, $http, $location, $routeParams ) {

	$scope.id = $routeParams.id;

	$http.get( '../data/cars.json' )
		.success(( data, status, headers, config ) => {
			$scope.cars = data;
			$scope.car = $scope.cars[$scope.id];
		})
		.error(( data, status ) => {
			console.log("Error status : " + status);
		});
}]);