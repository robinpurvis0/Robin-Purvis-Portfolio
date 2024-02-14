// Code citation: Code was adapted from the provided guide https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let updateGameForm = document.getElementById('update-game-form-ajax');
let updateGameDropDown = document.getElementById('updateGameID');

// Change field in update form when id is selected
updateGameDropDown.addEventListener('change', (e) => {
    // Find selected gameID
    let gameID = updateGameDropDown.options[updateGameDropDown.selectedIndex].value;
    let table = document.getElementById("game-table");

    // Loop through table
    for (let i = 1, row; row = table.rows[i]; i++) {
        // Find row of gameID
        if (table.rows[i].getElementsByTagName("td")[0].innerHTML == gameID) {
            // Get elements we need
            let row = table.rows[i];
            let gameTitle = row.getElementsByTagName("td")[1].innerHTML;
            let gameDescription = row.getElementsByTagName("td")[2].innerHTML;
            let gameRating = row.getElementsByTagName("td")[3].innerHTML;
            let gamePrice = row.getElementsByTagName("td")[4].innerHTML;

            // If game rating is empty, set to NULL
            if (gameRating == ''){
                gameRating = 'NULL';
            }

            // Update fields in form
            document.getElementById("updateGameDescription").value = gameDescription;
            document.getElementById("updateGamePrice").value = gamePrice;
            document.getElementById("updateGameTitle").value = gameTitle;
            // Loop through dropdowns to select correct element          
            for(var option of document.getElementById("updateGameRating")){
                if(option.value == gameRating){
                    option.selected = true;
                    break;
                }
            }
        }
    }
});

// Modify the objects we need
updateGameForm.addEventListener("submit", function (e) {
  // Prevent the form from submitting
  e.preventDefault();
  
  // Get form fields we need to get data from
  let inputGameID = document.getElementById("updateGameID");
  let inputGameTitle = document.getElementById("updateGameTitle");
  let inputGameDescription = document.getElementById("updateGameDescription");
  let inputGamePrice = document.getElementById("updateGamePrice");
  let inputGameRating = document.getElementById("updateGameRating");

  // Get the values from the form fields
  let gameTitleValue = inputGameTitle.value;
  let gameIDValue = inputGameID.options[inputGameID.selectedIndex].value;
  let gameDescriptionValue = inputGameDescription.value;
  let gamePriceValue = inputGamePrice.value;
  let gameRatingValue = inputGameRating.value;

  // Put our data we want to send in a javascript object
  let data = {
      gameID: gameIDValue,
      gameTitle: gameTitleValue,
      gameDescription: gameDescriptionValue,
      gamePrice: gamePriceValue,
      gameRating: gameRatingValue,
  }
  
  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "/put-game-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 200) {

          // Add the new data to the table
          updateRow(xhttp.response, gameTitleValue);

      }
      else if (xhttp.readyState == 4 && xhttp.status != 200) {
          console.log("There was an error with the input.")
      }
  }

  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));
})

function updateRow(data, GameID){
    let parsedData = JSON.parse(data);
    let table = document.getElementById("game-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == GameID) {

            // Get the location of the row where we found the matching Game ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of gameID value
            let td = updateRowIndex.getElementsByTagName("td")[3];

            td.innerHTML = parsedData[0].name; 
        }
    }
    window.location.reload(true)
}