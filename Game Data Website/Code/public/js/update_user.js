// Code citation: Code was adapted from the provided guide https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let updateUserForm = document.getElementById('update-user-form-ajax');
let updateUserDropDown = document.getElementById('updateUserID');

// Change field in update form when id is selected
updateUserDropDown.addEventListener('change', (e) => {
    // Find selected userID
    let userID = updateUserDropDown.options[updateUserDropDown.selectedIndex].value;
    let table = document.getElementById("user-table");

    // Loop through table
    for (let i = 1, row; row = table.rows[i]; i++) {
        // Find row of userID
        if (table.rows[i].getElementsByTagName("td")[0].innerHTML == userID) {
            // Get elements we need from table
            let row = table.rows[i];
            let userName = row.getElementsByTagName("td")[1].innerHTML;
            let userEmail = row.getElementsByTagName("td")[2].innerHTML;
            let userStoreCredit = row.getElementsByTagName("td")[3].innerHTML;

            // Update fields in form
            document.getElementById("updateUserName").value = userName;
            document.getElementById("updateUserEmail").value = userEmail;
            document.getElementById("updateUserStoreCredit").value = userStoreCredit;
        }
    }
});
// Modify the objects we need
updateUserForm.addEventListener("submit", function (e) {
  // Prevent the form from submitting
  e.preventDefault();
  
  // Get form fields we need to get data from
  let inputUserID = document.getElementById("updateUserID");
  let inputUserName = document.getElementById("updateUserName");
  let inputUserEmail = document.getElementById("updateUserEmail");
  let inputUserStoreCredit = document.getElementById("updateUserStoreCredit");

  // Get the values from the form fields
  let userNameValue = inputUserName.value;
  let userNameID = inputUserID.options[inputUserID.selectedIndex].value;
  let userEmailValue = inputUserEmail.value;
  let userStoreCreditValue = inputUserStoreCredit.value;

  // Put our data we want to send in a javascript object
  let data = {
      userID: userNameID,
      userName: userNameValue,
      userEmail: userEmailValue,
      userStoreCredit: userStoreCreditValue,
  }
  
  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "/put-user-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 200) {

          // Add the new data to the table
          updateRow(xhttp.response, userNameValue);

      }
      else if (xhttp.readyState == 4 && xhttp.status != 200) {
          console.log("There was an error with the input.")
      }
  }

  // Send the request and wait for the response
  console.log(data);
  xhttp.send(JSON.stringify(data));
})

function updateRow(data, userID){
    let parsedData = JSON.parse(data);
    let table = document.getElementById("user-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == userID) {

            // Get the location of the row where we found the matching userID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of userID value
            let td = updateRowIndex.getElementsByTagName("td")[3];

            td.innerHTML = parsedData[0].name; 
        }
    }
    window.location.reload(true)
}