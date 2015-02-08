var moment = require('moment')();
var Client = require('node-rest-client').Client;
var client = new Client();

var exports = module.exports;

// Transport API app code and id
exports.keyInfo = "&api_key=c55a03633869a4b6b7c0696213707205&app_id=1865d490";

exports.findNearestFiveBusStops = function(latitude, longitude, callbackHandler) {
    if (!latitude || !longitude || !callbackHandler) {
        return new Error("Not all parameters are defined");
    }
    var locationInfo = "?lat="+latitude+"&lon="+longitude;
    client.get("http://transportapi.com/v3/uk/bus/stops/near.json"+locationInfo+"&page=1&rpp=5"+me.keyInfo, function(data, response) {
        callbackHandler({"nearestBusStops" : data.stops});
    });
};

exports.findNextFiveBusesFromStop = function(busStopCode, callbackHandler) {
    if (!busStopCode || !callbackHandler) {
        return new Error("Not all parameters are defined");
    }
    var dateTime = moment.format('YYYY-MM-DD/HH:mm/');
    var parameters = busStopCode+"/"+dateTime;
    client.get("http://transportapi.com/v3/uk/bus/stop/"+parameters+"timetable.json?group=route&page=1&rpp=5"+me.keyInfo, function(data, response) {
        departures = data.departures, nextDepartures = {};
        for (route in departures) {
            len = departures[route].length;
            if (len > 1) {
                nextDepartures[route] = departures[route].splice(2,len-2);
            } else {
                nextDepartures[route] = departures[route];
            }
        }
        callbackHandler({"nextBuses" : nextDepartures});
    });
};

exports.findStopsForBus = function(bus,callbackHandler){

}





