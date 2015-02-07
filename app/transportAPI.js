var exports = module.exports = {};

// Transport API app code and id
exports.keyInfo = "&api_key=c55a03633869a4b6b7c0696213707205&app_id=1865d490";

// Initialise the client
exports.init = function() {
    console.log("Initialising client");
    var Client = require('node-rest-client').Client;
    this.client = new Client();
    console.log("Initialised client");
};

// Find near by bus stops
exports.findNearestFiveBusStops = function(latitude, longitude, callbackHandler) {
    var me = this;
    if (!latitude || !longitude || !callbackHandler) {
        return new Error("Not all parameters are defined");
    }
    var locationInfo = "?lat="+latitude+"&lon="+longitude;
    me.client.get("http://transportapi.com/v3/uk/bus/stops/near.json"+locationInfo+"&page=1&rpp=5"+me.keyInfo, callbackHandler);
};

