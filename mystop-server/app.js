var fs = require('fs');
var express=require('express');
var app = express();

var http = require('http');
var server = http.Server(app);
// to be used later var io = require('socket.io')(http);
var transportAPI = require("./transportAPI.js");
//var default_latitude = "50.730511", default_longitude = "-1.840660";

app.get('/', function(req, res) {
    res.statusCode = 500;
    res.send("Hello there curious user !");
});

app.get('/nearestBusStops', function (req, res) {
    console.log("nearestBusStops called");
    var latitude = req.query.lat, longitude = req.query.long;
    transportAPI.findNearestFiveBusStops(latitude, longitude, function(err, data){
        if(err) {
            console.error("could not retreive 5 nearest busstops",err);
            res.statusCode=500;
            res.send({"error": "Failed to access TransportAPI"});
        }else{
            res.send(data);
        }

    });
});

app.get('/nextBuses', function (req, res) {
    var busStopCode = req.query.bsCode;
    transportAPI.findNextFiveBusesFromStop(busStopCode, function(err, data){
        if(err) {
            res.statusCode=500;//more appropiate http status code?
            res.send({"error": "Failed to access TransportAPI"});
        }else{
            res.send(data);
        }
    });
});

app.get('/stopsForRoute', function(req,res){
    var bus = {};
    bus.line=req.query.line;
    bus.date=req.query.date;
    bus.operator = req.query.operator;
    bus.aimed_departure_time = req.query.aimed_departure_time;
    bus.dir=req.query.dir;
    bus.atcocode=req.query.atcocode;
    console.log("about to query stops for bus");
    transportAPI.findStopsForBus(bus, function(err, data) {;
        if(err) {
            res.statusCode=500;
            res.send({error:"Could not access Transport API"});
        }else{
            res.send(data);
        }
    });

});
app.use(express.static(__dirname + '../../mystop-web'));
console.log(__dirname);

server.listen(5709, function () {
    console.log('listening on port : 5709');
});
