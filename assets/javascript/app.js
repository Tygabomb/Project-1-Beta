
let map;


function submit() {
    $(".FrontButton").on("click", function () {
        console.log("submit works");
        // event.preventDefault();
        // const location = $(event.currentTarget).find('.locationForm').val();
        const queryURL = "https://maps.googleapis.com/maps/api/directions/json?";


        //call to geocodeAPI to get the latitute and longitude
        $.ajax({
            url: queryURL,
            dataType: 'json',
            type: 'GET',
            data: {
                origin: 'Toronto',
                destination: 'Montreal',
                avoid: 'highway',
                mode: 'bicycling',
                key: 'AIzaSyDzgrHg1NotksoCzY-i-E98LuqKE-SH4Fg'
            },
            "success": function (data) {
                console.log(data);

            }
        })
    });
}

submit();

// function initMap() {
//     console.log("in init map");
//     map = new google.maps.Map(document.getElementById('map'), {
//         zoom: 12,
//         center: { lat: 45.516136, lng: -73.656830 },
//     });

// }

function showMap() {
    $(".map").css('display', 'block');
}





