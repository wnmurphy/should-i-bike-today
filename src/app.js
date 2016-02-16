angular.module('shouldIBikeToday', ['shouldIBikeToday.services'])

.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
])

.controller('tripController', function($scope, Trip){
  $scope.departTime = Date.now();
  $scope.rain; // passed to getWeather call, stores boolean result
  
  // Wrapper function for call to getWeather service.
  $scope.getWeather = function(time, rain){
    Trip.getWeather($scope.departTime).then(function(x){
      $scope.rain = x;
    });
  };

  if(!!$scope.rain === false){
    $scope.rainText = 'No rain in next 30 minutes. Bike away!';
  }else if(!!$scope.rain === true){
    $scope.rainText = 'Looks soggy. Better drive today.';
  }
});