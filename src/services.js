angular.module('shouldIBikeToday.services', [])

.factory('Trip', function ($http) {

  var getWeather = function(time, decision){
    console.log('getWeather in Trip, time is: ' + time); // <----- verify method call

    // Get lat and lng
    function getLocation(location) {
          return {
            lat: location.coords.latitude,
            lng: location.coords.longitude
          };     
    }

    var userLocation = navigator.geolocation.getCurrentPosition(getLocation);
    // var lat = userLocation.lat;
    // var lng = userLocation.lng;

    // Mask argument with hardcoded time for debugging
    var time = 1455585831;

    // Hardcode coords for debugging
    var lat = 37.402965;
    var lng = -122.04998610000001;

    // Build API GET request
    var api = 'https://api.forecast.io/forecast/ee14bf968ac6494ddc8bf6fc90e0e815/' +
      lat + ',' + lng + ',' + time + 
      '?exclude=[currently,hourly,daily,alerts,flags]';


    // Make the request
    return $http({
      method: 'GET',
      url: api
    }).success(function(results){

      // map precipitation probability for next 30 minutes
      var precipOdds = results.minutely.data.filter(function(minute){
        return minute.precipProbability > 0.1;
      });

      console.log('precipOdds: ' + precipOdds); // <----- log results

      // define precipitation checker
      function gonnaRain(arr){
        if(arr.length){
          return true;
        }
        return false;
      }

      // store rain boolean for use in controller
      rain = gonnaRain(precipOdds);
      console.log('rain in next 30 minutes: ' + rain); // <----- log results
    }).error(function errorCallback(err){
      console.error(err);
    });
  };
  
  
  return {
    getWeather: getWeather
  };

});