var moment = require('moment')();
var Client = require('node-rest-client').Client;
var client = new Client();

var exports = module.exports;

var BASE_URL = "http://transportapi.com/v3/uk/bus/";

// Transport API app code and id
var keyInfo = "api_key=c55a03633869a4b6b7c0696213707205&app_id=1865d490";

exports.findNearestFiveBusStops = function(latitude, longitude, callbackHandler) {
    if (!latitude || !longitude || !callbackHandler) {
        return new Error("Not all parameters are defined");
    }
    var locationInfo = "?lat="+latitude+"&lon="+longitude;
    var req = client.get(BASE_URL + "stops/near.json"+locationInfo+"&page=1&rpp=5&"+keyInfo, function(data) {
        console.log("11");
        callbackHandler(null, {nearestBusStops : data.stops});
    });
    console.log("3");
    req.on('error',function() {
        console.log("4");
        callbackHandler("could not access transport api");

    });
};

exports.findNextFiveBusesFromStop = function(busStopCode, callbackHandler) {
    console.log("infindNext5Buses");
    if (!busStopCode || !callbackHandler) {
        return new Error("Not all parameters are defined");
    }
    var dateTime = moment.format('YYYY-MM-DD/HH:mm/');
    var parameters = busStopCode+"/"+dateTime;
    var url = BASE_URL + "stop/" + parameters + "timetable.json?group=route&page=1&rpp=5&" + keyInfo;
    var req = client.get(url, function(data) {
        var departures = data.departures, nextDepartures = {};
        for (var route in departures) {
            var len = departures[route].length;
            if (len > 1) {
                nextDepartures[route] = departures[route].splice(2,len-2);
            } else {
                nextDepartures[route] = departures[route];
            }
        }
        callbackHandler(null,{"nextBuses" : nextDepartures, "atcocode" : data.atcocode});
    });

    req.on('error',function(){
        callbackHandler("Could not access Transport API");
    });
};

exports.findStopsForBus = function(bus,callbackHandler){

    var url = BASE_URL + "route/" + bus.operator + "/" + bus.line + "/" + bus.dir + "/" + bus.atcocode + "/" + bus.date + "/" + bus.aimed_departure_time + "/" + "timetable.json?" + keyInfo;
    var req = client.get(url, function(data) {
        callbackHandler(null,data);
    });

    req.on('error',function() {
       callbackHandler("Could not access Transport API");
    });
}





