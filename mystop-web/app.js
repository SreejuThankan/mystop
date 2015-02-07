(function(){
    var app = angular.module('mystop',[]);

    app.controller('BusesController',['$scope',function($scope){

        $scope.buses=[{code:"2a", destination:"Bournemouth", currentLocation:"Lansdowne"},
            {code:"1a", destination:"Christchurch", currentLocation:"Poole"},
            {code:"1d", destination:"Castlepoint", currentLocation:"Salisbury"}];
    }]);

})();
