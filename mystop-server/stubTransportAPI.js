var fs = require('fs');
var path = require('path');
var exports = module.exports;

function returnStubJsonFile(fileName,callback) {
    fs.readFile(path.join(__dirname, fileName), function (err, data) {
        callback(err, data);
    });
}
exports.findNearestFiveBusStops = function(latitude, longitude, callback) {
        returnStubJsonFile('FakeNearByBusStops.json',callback);
};

exports.findNextFiveBusesFromStop = function(busStopCode, callback) {
        returnStubJsonFile('FakeRoutesFromBusStop.json',callback);

};

exports.findStopsForBus = function(bus,callback){
        returnStubJsonFile('FakeStopsForRoute.json',callback);
};