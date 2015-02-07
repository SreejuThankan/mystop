(function () {
    var app = angular.module('mystop', ['ngRoute']);

    app.controller('BusesController', ['$scope', function ($scope) {

        $scope.buses = [{code: "2a", destination: "Bournemouth", currentLocation: "Lansdowne"},
            {code: "1a", destination: "Christchurch", currentLocation: "Poole"},
            {code: "1d", destination: "Castlepoint", currentLocation: "Salisbury"}];
    }]);

    app.controller('DestinationController', ['$scope', function ($scope) {

        $scope.stops = [{stopName:"Fishermans road "},{ stopName:"Derby Road"},{stopName: "Denver Road"}];
    }]);


    app.controller('DuringJourneyController', ['$scope', function ($scope) {

    }]);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'choose-bus.html',
            controller: 'BusesController'
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
