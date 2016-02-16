angular.module('shouldIBikeToday', ['shouldIBikeToday.services'])

.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
])

.controller('tripController', function($scope, Trip){
  $scope.departTime; // stores user HTML time input 
  $scope.decision; // passed to getWeather call, stores boolean result

  // Wrapper function for call to getWeather service.
  $scope.getWeather = function(time, result){
    Trip.getWeather($scope.departTime,  $scope.decision);
  };
});


// var now = Date.now();
  // time1 = moment.unix(now);