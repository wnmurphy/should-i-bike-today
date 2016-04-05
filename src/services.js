angular.module('shouldIBikeToday.services', [])

.factory('Trip', function ($http) {
  var api_base = 'https://api.forecast.io/forecast/ee14bf968ac6494ddc8bf6fc90e0e815/37.402965,-122.04998610000001,';

  var query = '?exclude=[currently,hourly,daily,alerts,flags]';

   // define precipitation checker
  var gonnaRain = function (arr){
                    if (arr.length) {
                      return true;
                    }
                    return false;
                  };

  var getWeather = function (time) {
        // trim the time
        time = time.toString();
        time = time.slice(0, time.length-3);
        time = parseInt(time);

        var api = api_base + time + query;

        return $http({
          method: 'GET',
          url: api
        }).then(function (result) {
          // filter precipitation probability for next 30 minutes
          var precipOdds = result.data.minutely.data.filter(function (minute) {
            return minute.precipProbability > 0.1;
          });
          rain = gonnaRain(precipOdds);
          return rain;
        }).catch(function (error) {
          console.error(error);
        });
      };

  return {
    getWeather: getWeather,
  };
});
