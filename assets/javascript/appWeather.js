// Weather ICON w/ API 

$(document).ready(function () {
  
  let URL = "https://api.openweathermap.org/data/2.5/weather";
  let weatherAPIKey = "58c218efb9618338868686af4eb8ad1e";
  let units = "units=imperial";
  let lat = "32.2";
  let long = "111";

  $.ajax({
    // ajax call takes url, type of connection, type of data we want to recieve from the api, then a callback function
    url: `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&${units}&APPID=${weatherAPIKey}`,
    type: "GET",
    dataType: "json",
    success: function (data) {
      // invoking (calling the function) the results from the api 
      weatherResults(data);
      console.log(dataType);
    },
  });
});