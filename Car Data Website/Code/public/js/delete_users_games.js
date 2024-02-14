// Code citation: Code was adapted from the provided guide https://github.com/osu-cs340-ecampus/nodejs-starter-app

function deleteUserGame(userGameID){
    let link = '/delete-user-game-ajax';
    let data = {
        userGameID: userGameID,
      };
    $.ajax({
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(result){
            deleteRow(userGameID);
        }
    });
}

function deleteRow(userGameID){
    let table = document.getElementById("user-game-table");
    for (let i =0, row; row = table.rows[i]; i++){
        if (table.rows[i].getAttribute("data-value") == userGameID){
            table.deleteRow(i);
            break;
        }
    }
    window.location.reload(true)
}