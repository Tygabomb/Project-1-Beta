//https://cors-anywhere.herokuapp.com
// let map;
const linkArray = [];
function submit() {
    $("#form, #form-panel").submit(function (event) {
        event.preventDefault();
        console.log("submit works");
        const googleApiKey = 'AIzaSyDzgrHg1NotksoCzY-i-E98LuqKE-SH4Fg';
        let someOriginInput = $(event.currentTarget).find("#start").val().trim();
        someOriginInput = someOriginInput.replace(/\s+/g, '');
        let origin = $(event.currentTarget).find("#start").val().trim();
        let replacedOrigin = origin.split(' ').join('+');

        let someDestinationInput = $(event.currentTarget).find("#end").val().trim();
        someDestinationInput = someDestinationInput.replace(/\s+/g, '');

        let destination = $(event.currentTarget).find("#end").val().trim();
        let replacedDest = destination.split(' ').join('+');
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
                
                if (data.status == 'OK') {
                    console.log(data);
                    let startCoord = data.routes[0].legs[0].start_location;
                    console.log(startCoord);
                    let endCoord = data.routes[0].legs[0].end_location;
                    console.log(endCoord);
          
                   initMap(startCoord, endCoord);
                              showMap();
                              weatherData();
          
                              saveNewRoute(replacedOrigin, replacedDest);
                          }
                          else {
                              $("#error").html("No existing bike route");
                          }


            },
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

    $(".buttonContainer").show();
    $("#right-panel").css('display');
    $(".map").css('display', 'block');
    $(".tucsonImage").addClass('hide-bg');
    $(".tucsonImage").hide();
}

$('#new-route-button').on('click', function () {
    $("#form-panel").show();
    $("#new-route-button").hide();

})

// dragElement(document.getElementById("form-panel"));
// function dragElement(elmnt) {
//   var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
//   if (document.getElementById(elmnt.id + "header")) {
//     /* if present, the header is where you move the DIV from:*/
//     document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
//   } else {
//     /* otherwise, move the DIV from anywhere inside the DIV:*/
//     elmnt.onmousedown = dragMouseDown;
//   }
//   function dragMouseDown(e) {
//     e = e || window.event;
//     e.preventDefault();
//     // get the mouse cursor position at startup:
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     document.onmouseup = closeDragElement;
//     // call a function whenever the cursor moves:
//     document.onmousemove = elementDrag;
//   }
//   function elementDrag(e) {
//     e = e || window.event;
//     e.preventDefault();
//     // calculate the new cursor position:
//     pos1 = pos3 - e.clientX;
//     pos2 = pos4 - e.clientY;
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     // set the element's new position:
//     elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
//     elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
//   }
//   function closeDragElement() {
//     /* stop moving when mouse button is released:*/
//     document.onmouseup = null;
//     document.onmousemove = null;
//   }
// }

function weatherData() {
    let URL = "https://api.openweathermap.org/data/2.5/weather";
    let key = "58c218efb9618338868686af4eb8ad1e";
    let units = "units=imperial";
    $.ajax({
        // ajax call takes url, type of connection, type of data we want to recieve from the api, then a callback function
        url: `https://api.openweathermap.org/data/2.5/weather?q=Tucson&${units}&APPID=${key}`,
        type: "GET",
        dataType: "json",
        success: function (data) {
            // invoking (calling the function) the results from the api 
            // weatherResults(data);

            weatherResult(data);
            console.log(data);
            console.log(data.main.temp);
            let temp = data.main.temp;
            console.log(data.weather[0].description);
            let descript = data.weather[0].description;
            console.log(data.weather[0].icon);
            let icon = data.weather[0].icon;
            console.log(data.wind.speed);
            let wind = data.wind.speed;

        },

        
        // if use submits a city thats not in the api it runs an error function
        
    });
}

function weatherResult(data) {
    let results = `   
    <div class="results">
        <h3>Weather for ${data.name},${data.sys.country}</h3>
        <p><span class="bold">Weather:</span> ${data.weather[0].main}<img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png"></p>
        <p><span class="bold">Description: ${data.weather[0].description}</p>
        <p><span class="bold">Temperature: ${data.main.temp} &deg;</p>
        <p><span class="bold">Pressure: ${data.main.pressure} hpa</p>
        <p><span class="bold">Humidity: ${data.main.humidity} %</p>
        <p><span class="bold">Wind Speed: ${data.wind.speed} m/s</p>
        <p><span class="bold">Wind Direction: ${data.wind.deg} &deg;</p> 
    </div>`;
    $("#weatherInfo").html(results);
}

$("#hide").click(function(){
    $("#weatherInfo").hide();
});

$("#show").click(function(){
    $("#weatherInfo").show();
});

function saveNewRoute(origin, destination) {
    $('#new-route-button').on("click", function () {

        console.log('`saveRoute` ran');
        const mapLink = `https://www.googel.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=bicycling`;
        console.log(mapLink);
        addItemToDropDown(mapLink);
        renderLinkList();
    });
}

function addItemToDropDown(mapLink) {
    console.log(`Adding "${mapLink}" to link list`);
    linkArray.push({ name: mapLink, checked: false });
}

function renderLinkList() {
    // render the shopping list in the DOM
    console.log('`renderShoppingList` ran');
    const shoppingListItemsString = generateLinkItemsString(linkArray);

    // insert that HTML into the DOM
    $('.dropdown-menu').html(shoppingListItemsString);
}

function generateLinkItemsString(linkArray) {
    console.log("Generating link list element");

    const items = linkArray.map((item, index) => generateItemElement(item, index));
    console.log(items);
    return items.join("");

}
function handleItemCheckClicked() {
    $('.dropdown-menu').on('click', `.js-item-toggle`, event => {
        console.log('`handleItemCheckClicked` ran');
        const itemIndex = getItemIndexFromElement(event.currentTarget);
        toggleCheckedForListItem(itemIndex);
        renderLinkList();
    });
}

function toggleCheckedForListItem(itemIndex) {
    console.log("Toggling checked property for item at index " + itemIndex);
    linkArray[itemIndex].checked = !linkArray[itemIndex].checked;
}


function generateItemElement(item, itemIndex, template) {
    return `
      <li class=" dropdown-item js-item-index-element" data-item-index="${itemIndex}">
        <span class="shopping-item">${item.name}</span>
        <div class="shopping-item-controls">
          <button class="shopping-item-delete js-item-delete">
              <span class="button-label">delete</span>
          </button>
        </div>
      </li>`;
}

function getItemIndexFromElement(item) {
    const itemIndexString = $(item)
        .closest('.js-item-index-element')
        .attr('data-item-index');
    return parseInt(itemIndexString, 10);
}

function deleteItem(itemIndex) {
    console.log("Adding checked property for item at index " + itemIndex);
    STORE.splice(itemIndex, 1);


}

function handleDeleteItemClicked() {
    // this function will be responsible for when users want to delete a shopping list
    // item

    $('.dropdown-menu').on('click', '.js-item-delete', event => {
        console.log('`handleDeleteItemClicked` ran');
        const itemIndex = getItemIndexFromElement(event.currentTarget);
        deleteItem(itemIndex);
        renderLinkList();

    });
}

function handleShoppingList() {
    renderLinkList();
    // saveNewRoute();
    handleItemCheckClicked();
    handleDeleteItemClicked();
}

handleShoppingList();
