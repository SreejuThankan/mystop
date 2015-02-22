(function () {
    var app = angular.module('mystop', ['ngRoute']);

    app.service('busService', function($http) {
        //$http.get("nearestBusStops?lat=" + lat + "&¡long=" + long).
        this.getNearestBusStops = function (position,callback) {
            $http.get("nearestBusStops?lat=50.730511&long=-1.840660").success(function (data) {
                    callback(data.nearestBusStops);
                }).error(function () {
                });
        };

        this.getNextBusesAtStop = function(busStopCode,callback){
            $http.get("nextBuses?bsCode=" + busStopCode).success(function(data){
                callback(data);
            }).error(function(){
            });
        };

        this.getStopsForBus = function(busInfo,callback){
            $http.get("stopsForRoute?operator=" + busInfo.operator + "&line=" + busInfo.line + "&date=" + busInfo.date + "&aimed_departure_time=" + busInfo.aimed_departure_time + "&dir=inbound&atcocode=" + busInfo.atcocode).success(function(data) {
                console.log("success",data);
                callback(data.stops);
            }).error(function(){
            });
        };

    });

    app.service('locationService',function(){
        this.getLocation = function(callback){
                navigator.geolocation.getCurrentPosition(function(position){
                    var location = {
                        long : position.coords.longitude,
                        lat : position.coords.latitude
                    };
                    callback(location);
            });
        }
    });

    app.controller('StartBusStopController', ['$scope','$http', 'busService','locationService', function ($scope,$http,busService,locationService) {
        var position = {
            lat:"50.730511",
            long:"1.840660"
        };
        //locationService.getLocation(function(location){
        //    position=location;
        //});
        busService.getNearestBusStops(position,function(nearestBusStops){
            $scope.stops = nearestBusStops;
        });
    }]);




    app.controller('RoutesController', ['$scope', '$http', '$routeParams','busService', function ($scope, $http,$routeParams,busService) {

        busService.getNextBusesAtStop($routeParams.busStopCode,function(data){
                $scope.routes = [];
                for (var routeCode in data.nextBuses) {
                    var firstBusForRoute = data.nextBuses[routeCode][0];
                    if (firstBusForRoute != null) {
                    firstBusForRoute.atcocode = data.atcocode;
                    $scope.routes.push(firstBusForRoute);
                }
            }
        });
    }]);


    app.controller('DestinationController', ['$scope', '$http', '$routeParams','busService', function ($scope, $http, $routeParams,busService) {
        busService.getStopsForBus($routeParams,function(stops){
           $scope.stops = stops;
        });
    }]);


    app.controller('DuringJourneyController', ['$scope', function ($scope) {

    }]);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '../choose-start.html',
            controller: 'StartBusStopController'
        });
        $routeProvider.when('/chooseRoute/:busStopCode', {
            templateUrl: '../choose-route.html',
            controller: 'RoutesController'
        });
        $routeProvider.when('/stopsForRoute/:operator/:line/:dir/:date/:aimed_departure_time/:atcocode', {
            templateUrl: '../choose-stop.html',
            controller: 'DestinationController'
        });
        $routeProvider.when('/duringjourney', {
            templateUrl: '../during-journey.html',
            controller: 'DuringJourneyController'
        });
    }])
})();