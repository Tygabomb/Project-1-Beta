// Wheater API 

var APIKey = "58c218efb9618338868686af4eb8ad1e";
var queryURL = "http://openweathermap.org/appid"  + APIKey; 

fetch(queryURL).then(function(data){
  return data.json()
}).then(function(data){
  console.log(data);
}); 

var div = document.createElement("div");
$("p:first").addClass("intro");

div.style.width = "100px";
div.style.height = "100px";
div.style.background = "red";
div.style.color = "white";
div.innerHTML = "Hello";

document.getElementById("main").appendChild(div);

$('.weather-temperature').openWeather({
	lat: 30,
	lng: 25
});