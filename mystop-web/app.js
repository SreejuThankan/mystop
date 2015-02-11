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
        console.log("about to download nearest bus stops");
        $http.get("nearestBusStops?lat=50.730511&long=-1.840660").
            success(function(data) {
                console.log("downloading nearest bus stops")
                console.log(data);
                $scope.stops = data.nearestBusStops;
            }).error(function (data) {
                console.log("using stub data");
            //$scope.stops=[{locality:"Boscombe"},{locality:"bmth"},{locality:"Castlepoint"}];
        });


    }]);

    app.controller('DestinationController', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
        console.log($routeParams.atcocode);
console.log("about to get stops for route");

        $http.get("stopsForRoute?operator=" + $routeParams.operator + "&line=" + $routeParams.line + "&date=" + $routeParams.date + "&aimed_departure_time=" + $routeParams.aimed_departure_time + "&dir=inbound&atcocode=" + $routeParams.atcocode).success(function(data) {
            console.log("success");
            console.log(data);
            $scope.stops = data.stops;
        }).error(function(){
            console.error("could not retrieve stops for route");
            $scope.stops = [{stopName:"Fishermans road "},{ stopName:"Derby Road"},{stopName: "Denver Road"}];
        });

        /*

         <strong>{{stop.stopName}}</strong>
         <strong>{{stop.line}}</strong>
         <strong>{{stop.operator}}</strong>
         <strong>{{stop.aimed_departure_time}}</strong>
         <strong>{{stop.dir}}</strong>
         <strong>{{stop.atcocode}}</strong>
         */


    }]);


    app.controller('DuringJourneyController', ['$scope', function ($scope) {

    }]);


    //the http requet below
    app.controller('RoutesController', ['$scope', '$http', '$routeParams', function ($scope, $http,$routeParams) {
        $http.get("nextBuses?bsCode=" + $routeParams.busStopCode).success(function(data){
            console.log("routes controller data.nextBuses" + data.nextBuses);
            $scope.routes = [];
            for (var routeCode in data.nextBuses){
                var firstBusForRoute = data.nextBuses[routeCode][0];
                    firstBusForRoute.atcocode=data.atcocode;
                console.log("RoutesController atcocode : " + firstBusForRoute.atcocode);
                if(firstBusForRoute!=null){
                    $scope.routes.push(firstBusForRoute);
                }
            }

        }).error(function(){
            log.error("could not retrieve routes from server. Using stub data instead.");
            //call nextBusesStubData and call function to populate scope

        });
        $scope.routes=[{destination: 'Christchurch', code : '3d'},{destination: 'Christchurch', code : '3d'},
            {destination: 'Christchurch', code : '3d'},
            {destination: 'Bournemouth', code : '6d'},
            {destination: 'Salisbury', code : '31'},
            {destination: 'London', code : '2a'},
            {destination: 'Bedford', code : '1b'}];
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
        $routeProvider.when('/stopsForRoute/:operator/:line/:dir/:date/:aimed_departure_time/:atcocode', {
            templateUrl: 'choose-stop.html',
            controller: 'DestinationController'
        });
        $routeProvider.when('/duringjourney', {
            templateUrl: 'during-journey.html',
            controller: 'DuringJourneyController'
        });
    }])
})();