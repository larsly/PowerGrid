$(document).foundation()


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
