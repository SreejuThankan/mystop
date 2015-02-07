(function () {
    var app = angular.module('mystop', ['ngRoute']);

    app.controller('BusesController', ['$scope', function ($scope) {

        $scope.buses = [{currentLocation: "Lansdowne"},
            {currentLocation: "Poole"},
            {currentLocation: "Salisbury"}];
    }]);

    app.controller('DestinationController', ['$scope', function ($scope) {

        $scope.stops = [{stopName:"Fishermans road "},{ stopName:"Derby Road"},{stopName: "Denver Road"}];
    }]);


    app.controller('DuringJourneyController', ['$scope', function ($scope) {

    }]);

    app.controller('RoutesController', ['$scope', function ($scope) {
        $scope.routes=[{destination: 'Christchurch', code : '3d'},{destination: 'Christchurch', code : '3d'},
            {destination: 'Christchurch', code : '3d'},
            {destination: 'Bournemouth', code : '6d'},
            {destination: 'Salisbury', code : '31'},
            {destination: 'London', code : '2a'},
            {destination: 'Bedford', code : '1b'}];
    }]);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'choose-bus.html',
            controller: 'BusesController'
        });
        $routeProvider.when('/chooseRoute', {
            templateUrl: 'choose-route.html',
            controller: 'RoutesController'
        });
        $routeProvider.when('/destination', {
            templateUrl: 'destination.html',
            controller: 'DestinationController'
        });
        $routeProvider.when('/duringjourney', {
            templateUrl: 'during-journey.html',
            controller: 'DuringJourneyController'
        });
    }])
})();
