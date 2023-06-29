$(document).foundation()

//fetch API query for charging stations

// var evQuery = "https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?api_key=YuxEi5gp0aq25h7DrlIY1TjV3LyXZI9dxAVRt5oX&location=1617+Cole+Blvd+Golden+CO&fuel_type=ELEC&access=public&radius=15.0&ev_network=all&limit=5"

/* params to use:
    access=public
    fuel_type=ELEC
    radius=15.0       //15 mile radius
    ev_network=all
  to-do-list:
   -the location= parameter needs to be filled in dynamically whenever the user submits info with the button
   -we could store that input in a variable and concatenate that into the url
   -one of our previous activities did something similar
*/

// set up our event listener for search button. Need to write function handleSearchFormSubmit
/*
var searchForm = document.querySelector('#search');
searchForm.addEventListener('submit', handleSearchFormSubmit);
*/

// assuming that we have a favorite button next to our populated list items
// function to loop through our list items and add a click event listener to each favorite button
// needs to be workshopped but its a starting point
/*
var btnEls = document.getElementById("favorite");
var textEls = document.getElementById("location");
for (var i = 0; i < btnEls.length; i++) {
    textEls[i].innerText = JSON.parse(localStorage.getItem(btnEls[i].parentElement.id));
    btnEls[i].addEventListener("click", function () {
      var saveText = $(this).siblings("#location").val();
      localStorage.setItem(this.parentElement.id, JSON.stringify(saveText));
    });
  }
*/

var stationContainer = document.getElementById("#places-container");

  function getApi() {
    var evQuery = "https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?api_key=YuxEi5gp0aq25h7DrlIY1TjV3LyXZI9dxAVRt5oX&location=23225&fuel_type=ELEC&access=public&radius=15.0&ev_network=all&limit=5"
  
    fetch(evQuery)
          .then(function(response) {
            return response.json();
          })
          .then(function(data) {
            console.log(data.fuel_stations)
            var dataSet = data.fuel_stations;
            // var dataArr = [];
            // dataArr.push(data);
            // console.log(dataArr);
            for (i = 0; i < dataSet.length; i++) {
              console.log(dataSet[i]);
              console.log(dataSet[i].station_name);
              console.log(dataSet[i].street_address);
              console.log("latitude: " + dataSet[i].latitude);
              console.log("longitude: " + dataSet[i].longitude);
              // var stationName = document.createElement("h3");
              // var stationAddress = document.createElement("p"); 
      
              // stationName.textContent = dataSet[i].fuel_stations.station_name;
              // stationAddress.textContent = dataSet[i].fuel_stations.street_address;
      
              // stationContainer.appendChild(stationName);
              // stationContainer.appendChild(stationAddress);
            }
          })
  };
  
  getApi();

//MAP

  var map;
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
    setMarkers(map);
  }

// Data for the markers consisting of a name, a LatLng and a zIndex for the
// order in which these markers should display on top of each other.
const beaches = [
["Bondi Beach", -33.890542, 151.274856, 4],
["Coogee Beach", -33.923036, 151.259052, 5],
["Cronulla Beach", -34.028249, 151.157507, 3],
["Manly Beach", -33.80010128657071, 151.28747820854187, 2],
["Maroubra Beach", -33.950198, 151.259302, 1],
];

function setMarkers(map) {
// Adds markers to the map.
// Marker sizes are expressed as a Size of X,Y where the origin of the image
// (0,0) is located in the top left of the image.
// Origins, anchor positions and coordinates of the marker increase in the X
// direction to the right and in the Y direction down.
const image = {
url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
// This marker is 20 pixels wide by 32 pixels high.
size: new google.maps.Size(20, 32),
// The origin for this image is (0, 0).
origin: new google.maps.Point(0, 0),
// The anchor for this image is the base of the flagpole at (0, 32).
anchor: new google.maps.Point(0, 32),
};
// Shapes define the clickable region of the icon. The type defines an HTML
// <area> element 'poly' which traces out a polygon as a series of X,Y points.
// The final coordinate closes the poly by connecting to the first coordinate.
const shape = {
coords: [1, 1, 1, 20, 18, 20, 18, 1],
type: "poly",
};

for (let i = 0; i < beaches.length; i++) {
    const beach = beaches[i];

    new google.maps.Marker({
        position: { lat: beach[1], lng: beach[2] },
        map,
        icon: image,
        shape: shape,
        title: beach[0],
        zIndex: beach[3],
      });
    }
  }

window.initMap = initMap;