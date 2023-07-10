$(document).foundation()

// global variables for search form
var cityInput = document.querySelector("#cityInput");
var stateInput = document.querySelector("#stateInput");
var userInputBtn = document.querySelector("#userInputBtn");
var setInfoBtn = document.querySelector("#setInfoBtn");
var infoList = document.querySelector("#infoList");
var stationList = document.getElementById("places-container");
var favBtn = document.getElementById("favBtn");
var favList = document.getElementById("favorites-container");
var alertArea = document.querySelector(".alertArea");
var searchItem = document.getElementById("search-item");


// grabs user input on click
userInputBtn.addEventListener("click", function(event) {
    event.preventDefault();
    var city = document.querySelector("#cityInput").value;
    var state = document.querySelector("#stateInput").value;
    console.log("I've been clicked! ");
    if(city === "" || state === "") {
      alertArea.innerText = "Please enter all fields!";
      return;
    } else {
      alertArea.innerText = "";
      getApi(city, state);
    }
    
});

// print location in favorites list
favBtn.addEventListener("click", function(event) {
  event.preventDefault();
  console.log("I've been clicked");

  var city = document.querySelector("#cityInput").value;
  var state = document.querySelector("#stateInput").value;
  // if empty nothing favorites
  if (city.trim().length === 0 || state.trim().length === 0) return;
  //get favorites list from local storage

  var favorites = JSON.parse(localStorage.getItem("favorites"));

  if (favorites == null) {
    favorites = [];
  }
  // stores key and value in localStorage as an object
  favorites.push({
    "city": city,
    "state": state,
  });
  // save favorites list to local storage
  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderFavorites();
});

// show favorites on page
function renderFavorites(){
  var favorites = JSON.parse(localStorage.getItem("favorites"));
  if (favorites == null) {
    favorites = [];
  }
  favList.innerHTML = [];

  // append to favorites list
  for (i = 0; i < favorites.length; i++){
    var favListItem = document.createElement("li"); 
    var cityState = document.createElement("h3");
    cityState.innerText = (favorites[i].city + ", " + favorites[i].state);
    favListItem.appendChild(cityState);
    favList.appendChild(favListItem);
    localStorage.setItem("city", favorites[i].city);
    localStorage.setItem("state", favorites[i].state);
  
    // adds go button to fav list item
    var goButton = document.createElement("button");
    goButton.innerHTML = "Go!";
    favListItem.appendChild(goButton);
    goButton.classList.add("button", "go-button");
  
    // go button event listener
    goButton.addEventListener("click", function(event){
    var localFavorites = JSON.parse(localStorage.getItem("favorites"));
    // determines child node's index inside of its parent node 
    var index = Array.from(this.parentNode.parentNode.childNodes).indexOf(this.parentNode);
    getApi(localFavorites[index].city, localFavorites[index].state);
    });
  
    // adds delete button to fav list item
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    favListItem.appendChild(deleteButton);
    deleteButton.classList.add("button", "delete-button");
  
    // delete button event listener
    deleteButton.addEventListener("click", function(event){
    var localFavorites = JSON.parse(localStorage.getItem("favorites"));
    // determines child node's index inside of its parent node 
    var index = Array.from(this.parentNode.parentNode.childNodes).indexOf(this.parentNode);
    localFavorites.splice(index, 1);
    console.log(localFavorites);
    localStorage.setItem("favorites", JSON.stringify(localFavorites));
    renderFavorites();
    })};
}


  function getApi(city, state) {
    // var chosenCity = localStorage.getItem("city");
    // var chosenState = localStorage.getItem("state");
    // grabs stored input and concatenates it into a form the API url can use
    searchItem.innerHTML = city + ", " + state;
    var location = city + "+" + state; 
    var evQuery = `https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?api_key=YuxEi5gp0aq25h7DrlIY1TjV3LyXZI9dxAVRt5oX&location=${location}&fuel_type=ELEC&access=public&cards_accepted=A, D, M, V&radius=15.0&ev_network=all&limit=5`
  
    fetch(evQuery)
          .then(function(response) {
            return response.json();
          })
          .then(function(data) {
            stationList.innerHTML = "";
            console.log(data.fuel_stations) 
            var dataSet = data.fuel_stations;
            var stationData = [];
            for (i = 0; i < dataSet.length; i++) {   
              console.log(dataSet[i]);
              console.log(dataSet[i].station_name);
              console.log(dataSet[i].street_address);
              console.log("latitude: " + dataSet[i].latitude);
              console.log("longitude: " + dataSet[i].longitude);
              
              var stationListItem = document.createElement("li");
              var stationName = document.createElement("h3");
              var stationAddress = document.createElement("p"); 
      
              stationName.textContent = dataSet[i].station_name;
              stationAddress.textContent = dataSet[i].street_address;
      
              stationListItem.appendChild(stationName);
              stationListItem.appendChild(stationAddress);
              stationListItem.classList.add("stationListItem");
              stationList.appendChild(stationListItem);
              stationData.push({
                name: dataSet[i].station_name,
                latitude: dataSet[i].latitude,
                longitude: dataSet[i].longitude,
                zindex: i
              });
              setMarkers(map, stationData)
            }
          })
  };

//MAP

  var map;
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
    setMarkers(map, []);

  }

function setMarkers(map, markers) {
  if (markers.length === 0 ) return;
  map.setCenter({
    lat: markers[0].latitude,
    lng: markers[0].longitude,
  });
const image = {
url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
size: new google.maps.Size(20, 32),
origin: new google.maps.Point(0, 0),
anchor: new google.maps.Point(0, 32),
};
const shape = {
coords: [1, 1, 1, 20, 18, 20, 18, 1],
type: "poly",
};

for (let i = 0; i < markers.length; i++) {
  const placeMarker = markers[i];
  
    new google.maps.Marker({
        position: { lat: placeMarker.latitude, lng: placeMarker.longitude },
        map,
        icon: image,
        shape: shape,
        title: placeMarker.name,
        zIndex: placeMarker.zindex,
      });
    }
  }

window.initMap = initMap;
renderFavorites();