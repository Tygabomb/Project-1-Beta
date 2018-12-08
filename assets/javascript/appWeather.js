// Weather ICON w/ API 


var weatherAPIKey = "58c218efb9618338868686af4eb8ad1e";
var lat = "32.2";
var long = "111";


$(document).ready(function () {
  // key variables 
  // let URL = "https://api.openweathermap.org/data/2.5/weather";
  let weatherAPIKey = "58c218efb9618338868686af4eb8ad1e";
  let units = "units=imperial";

  $("#hide").click(function () {
    $("main").hide();
  });

  $("#show").click(function () {
    $("main").show();
    Console.log(units)
  });


  $("#city").submit(function (event) {
    // stops the form from submitting
    event.preventDefault();
    // selects error span and empties the text in the error span
    $(".error").empty();
    // create a variable that stores the input value
    let cityInput = $(".textBox").val();
    // Then clear the input value
    $(".textBox").val("");
    console.log(cityInput);
    // START AJAX CALL 
    $.ajax({
      // ajax call takes url, type of connection, type of data we want to recieve from the api, then a callback function
      url: `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&${units}&APPID=${weatherAPIKey}`,
      type: "GET",
      dataType: "json",
      success: function (data) {
        // invoking (calling the function) the results from the api 
        weatherResults(data);
      },
      // if use submits a city thats not in the api it runs an error function
      error: function (xhr, ajaxOptions, thrownError) {

        if (xhr.status == 404) {
          errorResults(thrownError);
        }
      }
    });
  });

  // Create a function for error when user submits a city that isnt in the api
  // pass in message as a para that will be called inside the function to display to the user
  function errorResults(message) {
    $(".error").fadeOut(4000);
    // take error div and put in a message
    $(".error").html("City Not Found");
  }

  function weatherResults(data) {
    console.log(data);
    let results = `   
                          <div class="results">
                              <h3>Weather Now for ${data.name},${data.sys.country}</h3>
                              <p><span class="bold">Weather:</span> ${data.weather[0].main}<img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png"></p>
                              <p><span class="bold">Description: ${data.weather[0].description}</p>
                              <p><span class="bold">Temperature: ${data.main.temp} &deg;</p>
                              <p><span class="bold">Pressure: ${data.main.pressure} hpa</p>
                              <p><span class="bold">Humidity: ${data.main.humidity} %</p>
                              <p><span class="bold">Wind Speed: ${data.wind.speed} m/s</p>
                              <p><span class="bold">Wind Direction: ${data.wind.deg} &deg;</p> 
                          </div>
                      `;
    // show the results dynamically in showWeatherResults div
    $(".showWeatherResults").html(results);
  }
});

