
let map;


function submit() {
    $(".FrontButton").on("click", function () {
        console.log("submit works");
        // event.preventDefault();
        // const location = $(event.currentTarget).find('.locationForm').val();
        const googleApiKey = 'AIzaSyDzgrHg1NotksoCzY-i-E98LuqKE-SH4Fg';
        let someOriginInput = 'Toronto';
        let someDestinationInput = 'Montreal';

        let queryURL = `https://maps.googleapis.com/maps/api/directions/json?origin=${someOriginInput}&destination=${someDestinationInput}&avoid=highways&mode=bicycling&key=${googleApiKey}`;

        let encodedUrl = encodeURIComponent(queryURL);
        //call to geocodeAPI to get the latitute and longitude
        $.ajax({
            url: `https://corsbridge.herokuapp.com/${encodedUrl}`,
            contentType: 'application/json',
            type: 'GET',
            "success": function (data) {
                console.log(data);
                initMap();
                showMap();

            }
        })
    });
}

submit();


function initMap() {
    console.log("in init map");
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: { lat: 45.516136, lng: -73.656830 },
    });

}

function showMap() {
    $(".map").css('display', 'block');
}



