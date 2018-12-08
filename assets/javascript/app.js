
let map;
function submit() {
    $("#form, #form-panel").submit(function (event) {
        event.preventDefault();
        console.log("submit works");
        const googleApiKey = 'AIzaSyDzgrHg1NotksoCzY-i-E98LuqKE-SH4Fg';
        let someOriginInput = $(event.currentTarget).find("#start").val().trim();
        someOriginInput = someOriginInput.replace(/\s+/g, '');
        let someDestinationInput = $(event.currentTarget).find("#end").val().trim();
        someDestinationInput = someDestinationInput.replace(/\s+/g, '');
        console.log(someDestinationInput);

        let queryURL = `https://maps.googleapis.com/maps/api/directions/json?origin=${someOriginInput}&destination=${someDestinationInput}&avoid=highways&mode=bicycling&key=${googleApiKey}`;
        console.log(queryURL);

        let encodedUrl = encodeURIComponent(queryURL);
        //call to geocodeAPI to get the latitute and longitude
        $.ajax({
            url: `https://corsbridge.herokuapp.com/${encodedUrl}`,
            contentType: 'application/json',
            type: 'GET',
            "success": function (data) {
                console.log(data);
                let startCoord = data.routes[0].legs[0].start_location;
                console.log(startCoord);
                let endCoord = data.routes[0].legs[0].end_location;
                console.log(endCoord);
                initMap(startCoord, endCoord);
                showMap();


            }
        })
    });
}

submit();

function initMap(startCoord, endCoord) {
    console.log("in init map");
    let directionsDisplay = new google.maps.DirectionsRenderer;
    let directionsService = new google.maps.DirectionsService;
    let start = new google.maps.LatLng(startCoord);
    let end = new google.maps.LatLng(endCoord);

    let mapOptions = {
        zoom: 15,
        center: start
    };
    let map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('right-panel'));
    calcRoute(start, end, directionsService, directionsDisplay);
    map.setMapTypeId('hybrid');
    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);
    var bikeLayer = new google.maps.BicyclingLayer();
    bikeLayer.setMap(map);
}

function calcRoute(start, end, directionsService, directionsDisplay) {
    let request = {
        origin: start,
        destination: end,
        travelMode: 'BICYCLING'
    };
    directionsService.route(request, function (result, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(result);
        }
    });

}
function showMap() {
    $(".result").show();
    $("#new-route-button").show();

    $("#right-panel").css('display');
    $(".map").css('display', 'block');
    $(".tucsonImage").addClass('hide-bg');
    $(".tucsonImage").hide();
}

$('#new-route-button').on('click', function () {
    $("#form-panel").show();
    $("#new-route-button").hide();

})




