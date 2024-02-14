// Code citation: Code was adapted from the provided guide https://github.com/osu-cs340-ecampus/nodejs-starter-app

function deleteGame(gameID){
    let link = '/delete-game-ajax/';
    let data = {
        id: gameID
      };
    $.ajax({
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(result){
            deleteRow(gameID)
        }
    });
}

function deleteRow(gameID){
    let table = document.getElementById("game-table");
    for (let i =0, row; row = table.rows[i]; i++){

        if (table.rows[i].getAttribute("data-value") == gameID){
            table.deleteRow(i);
            break;
        }
    }
    window.location.reload(true)
}
