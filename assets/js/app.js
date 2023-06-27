$(document).foundation()

//fetch API query for charging stations
var evQuery = "https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?api_key=YuxEi5gp0aq25h7DrlIY1TjV3LyXZI9dxAVRt5oX&location=1617+Cole+Blvd+Golden+CO&fuel_type=ELEC&access=public&radius=15.0&ev_network=all&limit=5"
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
var searchForm = document.querySelector('#search');
searchForm.addEventListener('submit', handleSearchFormSubmit);

// assuming that we have a favorite button next to our populated list items
// function to loop through our list items and add a click event listener to each favorite button
// needs to be workshopped but its a starting point
var btnEls = document.getElementById("favorite");
var textEls = document.getElementById("location");
for (var i = 0; i < btnEls.length; i++) {
    textEls[i].innerText = JSON.parse(localStorage.getItem(btnEls[i].parentElement.id));
    btnEls[i].addEventListener("click", function () {
      var saveText = $(this).siblings("#location").val();
      localStorage.setItem(this.parentElement.id, JSON.stringify(saveText));
    });
  }


//just here so that we can look in the console and see what details we can access
fetch(evQuery)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
  })


