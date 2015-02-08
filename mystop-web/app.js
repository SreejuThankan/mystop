(function () {
    var app = angular.module('mystop', ['ngRoute']);




    app.controller('StartBusStopController', ['$scope','$http', function ($scope,$http) {

        var long = null;
        var lat = null;
            navigator.geolocation.getCurrentPosition(function(position){
                var coords = position.coords;
                long = coords.longitude;
                lat=coords.latitude;
            });

        //$http.get("nearestBusStops?lat=" + lat + "&long=" + long).
        $http.get("nearestBusStops?lat=50.730511&long=-1.840660").
            success(function(data) {
                console.log(data);
                $scope.stops = data.nearestBusStops;
            }).error(function (data) {
                console.log("using stub data");
            $scope.stops=[{locality:"Boscombe"},{locality:"bmth"},{locality:"Castlepoint"}];
        });


    }]);

    app.controller('DestinationController', ['$scope', function ($scope) {

        $scope.stops = [{stopName:"Fishermans road "},{ stopName:"Derby Road"},{stopName: "Denver Road"}];
    }]);


    app.controller('DuringJourneyController', ['$scope', function ($scope) {

    }]);

    app.controller('RoutesController', ['$scope', '$http', '$routeParams', function ($scope, $http,$routeParams) {
        $http.get("nextBuses?bsCode=" + $routeParams.busStopCode).success(function(data){
            //console.log(data.nextBuses);
            $scope.routes = [];
            for (var routeCode in data.nextBuses){
                $scope.routes.push(data.nextBuses[routeCode][0]);
            }




        }).error(function(){
            log.error("could not retrieve routes from server. Using stub data instead.");
        });
        //$scope.routes=[{destination: 'Christchurch', code : '3d'},{destination: 'Christchurch', code : '3d'},
        //    {destination: 'Christchurch', code : '3d'},
        //    {destination: 'Bournemouth', code : '6d'},
        //    {destination: 'Salisbury', code : '31'},
        //    {destination: 'London', code : '2a'},
        //    {destination: 'Bedford', code : '1b'}];
    }]);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'choose-start.html',
            controller: 'StartBusStopController'
        });
        $routeProvider.when('/chooseRoute/:busStopCode', {
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

