// Code citation: Code was adapted from the provided guide https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let updateGenreForm = document.getElementById('update-genre-form-ajax');
let updateGenreDropDown = document.getElementById('updateGenreID');


// Change field in update form when id is selected
updateGenreDropDown.addEventListener('change', (e) => {
    // Find selected genreID 
    let genreID = updateGenreDropDown.options[updateGenreDropDown.selectedIndex].value;
    let table = document.getElementById("genre-table");

    // Loop through table
    for (let i = 1, row; row = table.rows[i]; i++) {
        // Find row of genreID
        if (table.rows[i].getElementsByTagName("td")[0].innerHTML == genreID) {
            // Get elements we need
            let row = table.rows[i];

            // Update fields in form
            let genreName = row.getElementsByTagName("td")[1].innerHTML;
            document.getElementById("updateGenreName").value = genreName;
        }
    }
});
// Modify the objects we need
updateGenreForm.addEventListener("submit", function (e) {
  // Prevent the form from submitting
  e.preventDefault();
  
  // Get form fields we need to get data from
  let inputGenreID = document.getElementById("updateGenreID");
  let inputGenreName = document.getElementById("updateGenreName");

  // Get the values from the form fields
  let genreIDValue = inputGenreID.options[inputGenreID.selectedIndex].text;
  let genreNameValue = inputGenreName.value;

  // Put our data we want to send in a javascript object
  let data = {
      genreID: genreIDValue,
      genreName: genreNameValue
  }
  
  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "/put-genre-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 200) {

          // Add the new data to the table
          updateRow(xhttp.response, genreIDValue);

      }
      else if (xhttp.readyState == 4 && xhttp.status != 200) {
          console.log("There was an error with the input.")
      }
  }

  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));
})

function updateRow(data, genreID){
    let parsedData = JSON.parse(data);
    let table = document.getElementById("genre-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == genreID) {

            // Get the location of the row where we found the matching genreID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of genreID value
            let td = updateRowIndex.getElementsByTagName("td")[3];

            td.innerHTML = parsedData[0].name; 
        }
    }
    window.location.reload(true)
}