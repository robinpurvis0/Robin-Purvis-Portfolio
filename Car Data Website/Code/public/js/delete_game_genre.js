// Code citation: Code was adapted from the provided guide https://github.com/osu-cs340-ecampus/nodejs-starter-app

function deleteGameGenre(gameGenreID){
    let link = '/delete-game-genre-ajax/';
    let data = {
        id: gameGenreID
      };
    $.ajax({
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(result){
            deleteRow(gameGenreID)
        }
    });
}

function deleteRow(gameGenreID){
    let table = document.getElementById("game-genre-table");
    for (let i =0, row; row = table.rows[i]; i++){

        if (table.rows[i].getAttribute("data-value") == gameGenreID){
            table.deleteRow(i);
            break;
        }
    }
    window.location.reload(true)
}
