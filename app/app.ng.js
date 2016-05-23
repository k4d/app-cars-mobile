console.log( 'Hello, Car mobile app!' );
console.info( 'Angular version', angular.version.full );

//	Angular App

let App = angular.module( 'CarApp', [] );

App.controller( 'MainController', [ '$scope', '$http', ( $scope, $http ) => {

	$scope.hello = 'Car Mobile App!';
	$scope.value = 'Hello, value!';

	$scope.$watch( 'value', () => {
		console.log( `Watch value: ${$scope.value}` );
	});

	$http.get( '../data/cars.json' )
		.success( ( data ) => {

console.info( data );

		});
}]);