// Weather ICON w/ API 

var map;
var geoJSON;
var request;
var gettingData = false;
var weatherAPIKey = "58c218efb9618338868686af4eb8ad1e";
var lat = "32.2";
var long = "111";

function initialize() {
  var mapOptions = {
    zoom: 4,
    center: new google.maps.LatLng(50, -50)
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);
}
var queryURL = `api.openweathermap.org/data/2.5/weather?lat=${lat}lon=${long}${weatherAPIKey}`;

let encodedUrl = encodeURIComponent(queryURL);

$.ajax({
  url: `https://corsbridge.herokuapp.com/${encodedUrl}`,
  contentType: 'application/json',
  type: 'GET',
  "success": function (data) {
    console.log(data);

}
}); 

// fetch(queryURL).then(function (data) {
//   return data.json()
// }).then(function (data) {
//   console.log(data);
// });

