var fs = require('fs');
var express=require('express');
var app = express();
var http = require('http').Server(app);
// to be used later var io = require('socket.io')(http);
var transportAPI = require("./transportAPI.js");
//var default_latitude = "50.730511", default_longitude = "-1.840660";

app.get('/', function(req, res) {
    res.send("Hello there curious user !");
});

app.get('/nearestBusStops', function (req, res) {
    var latitude = req.query.lat, longitude = req.query.long;
    var result = transportAPI.findNearestFiveBusStops(latitude, longitude, function(data){
        res.send(data);
    });
    if (result instanceof Error) {
        res.send({"error":"Failed to get the nearest bus stops"});
    }
});

app.get('/nextBuses', function (req, res) {
    var busStopCode = req.query.bsCode;
    var result = transportAPI.findNextFiveBusesFromStop(busStopCode, function(data){
        res.send(data);
    });
    if (result instanceof Error) {
        res.send({"error":"Failed to get the next buses"});
    }
});

app.use(express.static(__dirname + '../../mystop-web'));
console.log(__dirname);

http.listen(5709, function () {
    console.log('listening on port : 5709');
});
