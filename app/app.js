var transportAPI = require("./transportAPI.js");
// Initialise
transportAPI.init();

var latitude = "50.730511", longitude = "-1.840660";

var result = transportAPI.findNearestFiveBusStops(latitude, longitude, function(data,response){
    console.log(data);
});

if (result instanceof Error) {
    console.log("Find Nearest Five Bus Stops failed");
}