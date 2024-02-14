// Code citation: Code was adapted from the provided guide https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let updateReviewForm = document.getElementById('update-review-form-ajax');
let updateReviewDropDown = document.getElementById('updateReviewID');

// Change field in update form when id is selected
updateReviewDropDown.addEventListener('change', (e) => {
    // Find selected reviewID
    let reviewID = updateReviewDropDown.options[updateReviewDropDown.selectedIndex].value;
    let table = document.getElementById("review-table");

    // Loop through table
    for (let i = 1, row; row = table.rows[i]; i++) {
        // Find row of reviewID
        if (table.rows[i].getElementsByTagName("td")[0].innerHTML == reviewID) {
            // Get elements we need
            let row = table.rows[i];
            let userID = row.getElementsByTagName("td")[1].innerHTML;
            let gameID = row.getElementsByTagName("td")[2].innerHTML;
            let reviewRating = row.getElementsByTagName("td")[3].innerHTML;
            let reviewDescription = row.getElementsByTagName("td")[4].innerHTML;

            // If review description is empty, set to NULL
            if (reviewDescription == ''){
                reviewDescription = 'NULL';
            }

            // Update fields in form
            document.getElementById("updateReviewDescription").value = reviewDescription;
            // Loop through dropdowns to select correct element
            for(var option of document.getElementById("updateUserID")){
                if(option.value == userID){
                    option.selected = true;
                    break;
                }
            }
            
            for(var option of document.getElementById("updateGameID")){
                if(option.value == gameID){
                    option.selected = true;
                    break;
                }
            }

            for(var option of document.getElementById("updateReviewRating")){
                if(option.value == reviewRating){
                    option.selected = true;
                    break;
                }
            }
        }
    }
});

// Modify the objects we need
updateReviewForm.addEventListener("submit", function (e) {
  // Prevent the form from submitting
  e.preventDefault();
  
  // Get form fields we need to get data from
  let inputReviewID = document.getElementById("updateReviewID");
  let inputUserID = document.getElementById("updateUserID");
  let inputGameID = document.getElementById("updateGameID");
  let inputReviewRating = document.getElementById("updateReviewRating");
  let inputReviewDescription = document.getElementById("updateReviewDescription");

  // Get the values from the form fields
  let reviewIDValue = inputReviewID.options[inputReviewID.selectedIndex].value;
  let userIDValue = inputUserID.options[inputUserID.selectedIndex].value;
  let gameIDValue = inputGameID.options[inputGameID.selectedIndex].value;
  let reviewRatingValue = inputReviewRating.value;
  let reviewDescriptionValue = inputReviewDescription.value;

  // Put our data we want to send in a javascript object
  let data = {
      reviewID: reviewIDValue,
      userID: userIDValue,
      gameID: gameIDValue,
      reviewRating: reviewRatingValue,
      reviewDescription: reviewDescriptionValue,
  }
  
  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "/put-review-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 200) {

          // Add the new data to the table
          updateRow(xhttp.response, reviewIDValue);

      }
      else if (xhttp.readyState == 4 && xhttp.status != 200) {
          console.log("There was an error with the input.")
      }
  }

  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));
})

function updateRow(data, reviewID){
    let parsedData = JSON.parse(data);
    let table = document.getElementById("review-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == reviewID) {

            // Get the location of the row where we found the matching Game ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of gameID value
            let td = updateRowIndex.getElementsByTagName("td")[3];

            td.innerHTML = parsedData[0].name; 
        }
    }
    window.location.reload(true);
}