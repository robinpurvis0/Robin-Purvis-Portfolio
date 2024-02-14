// Code citation: The layout of the code was adapted from https://github.com/osu-cs340-ecampus/nodejs-starter-app

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 2036;                 // Set a port number at the top so it's easy to change in the future

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

// Database
var db = require('./database/db-connector')

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));


/*
    ROUTES
*/
app.get('/', function(req, res)                 // This is the basic syntax for what is called a 'route'
    {
        res.render('index');                    // Note the call to render() and not send(). Using render() ensures the templating engine
    });                                         // requesting the web site.


// Read Games data (Including dynamic search)
app.get('/games', function(req, res){
    let query1 

    if (req.query.gameSearch === undefined)
    {
        query1 = 'SELECT * FROM Games;';
    }
    else
    {
        query1 = `SELECT * FROM Games WHERE gameTitle LIKE "${req.query.gameSearch}%"`;
    }

    db.pool.query(query1, function(error, rows, fields){    
        res.render('games', {data: rows});                 
    })                                                     
});


// Add a Game
app.post('/add-game-form', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Games (gameTitle, gameDescription, gameRating, gamePrice) VALUES ('${data.gameTitle}', '${data.gameDescription}', NULLIF(${data.gameRating}, 'NULL'), '${data.gamePrice}')`;
    db.pool.query(query1, function(error, rows, fields){
       

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.redirect('/games')
            console.log("Invalid entry");
        }
        else
        {
            res.redirect('/games')
        }
    })
});


// Delete a Game   
app.delete('/delete-game-ajax', function(req, res, next){
    let data = req.body;
    let gameID = parseInt(data.id);
    let deleteGame = `DELETE FROM Games WHERE gameID = ?`;

          // Run the 1st query
          db.pool.query(deleteGame, [gameID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else
              {
                  // Run the second query
                  res.sendStatus(204);
              }
  })});

//Update a Game
app.put('/put-game-ajax', function(req,res,next){
    let data = req.body;
    console.log(data);
    let gameID = parseInt(data.gameID);
    let gameTitle = data.gameTitle;
    let gameDescription = data.gameDescription;
    let gameRating = parseInt(data.gameRating);
    let gamePrice = parseFloat(data.gamePrice);

    let queryUpdateGame = `UPDATE Games SET gameDescription = "${gameDescription}", gameRating = NULLIF(${data.gameRating}, 'NULL'), gamePrice = "${gamePrice}" WHERE gameID = "${gameID}"`;
    let selectGame = `SELECT * FROM Games WHERE gameID = "${gameID}"`


        // Run the 1st query
        db.pool.query(queryUpdateGame, [gameID, gameTitle, gameDescription, gameRating, gamePrice], function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }

            // If there was no error, we run our second query and return that data so we can use it to update the people's
            // table on the front-end
            else
            {
                // Run the second query
                db.pool.query(selectGame, [gameTitle], function(error, rows, fields) {

                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.send(rows);
                    }
                })
            }
})});



// Read Users data
app.get('/users', function(req, res){
    let query2 = 'SELECT * FROM Users;';

    db.pool.query(query2, function(error, rows, fields){    

        res.render('users', {data: rows});                 
    })                                                     
});

// Add a User
app.post('/add-user-form', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    
    // Create the query and run it on the database
    query1 = `INSERT INTO Users (userName, userEmail, userStoreCredit) VALUES ('${data.userName}', '${data.userEmail}', '${data.userStoreCredit}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            res.redirect('/users')
            console.log("Invalid entry");
        }
        else
        {
            res.redirect('/users')
        }
    })
});

// Delete a User
app.delete('/delete-user-ajax', function(req, res, next){
    let data = req.body;
    let userID = parseInt(data.id);
    let deleteUser = `DELETE FROM Users WHERE userID = ?`;

          // Run the 1st query
          db.pool.query(deleteUser, [userID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else
              {
                  // Run the second query
                  res.sendStatus(204);
              }
  })});

// Update a User
app.put('/put-user-ajax', function(req,res,next){
    let data = req.body;
    console.log(data);

    let userID = parseInt(data.userID);
    let userName = data.userName;
    let userEmail = data.userEmail;
    let userStoreCredit = parseInt(data.userStoreCredit);

    let queryUpdateUser = `UPDATE Users SET userName = "${userName}", userEmail = "${userEmail}", userStoreCredit = "${userStoreCredit}" WHERE userID = "${userID}"`;
    let selectUser = `SELECT * FROM Users WHERE userID = "${userID}"`
    console.log(queryUpdateUser);
    console.log(selectUser);

        // Run the 1st query
        db.pool.query(queryUpdateUser, [userID, userName, userEmail, userStoreCredit], function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }

            // If there was no error, we run our second query and return that data so we can use it to update the 
            // table on the front-end
            else
            {
                // Run the second query
                db.pool.query(selectUser, function(error, rows, fields) {

                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.send(rows);
                    }
                })
            }
})});

// Read Reviews data
app.get('/reviews', function(req, res){
    let query5 = 'SELECT * FROM Reviews;';
    let query6 = 'SELECT gameID, gameTitle FROM Games;';
    let query7 = 'SELECT userID, userName FROM Users;';

    db.pool.query(query5, function(error, rows, fields){    
        result1 = rows;
        
        db.pool.query(query6, function(error, rows, fields){
            result2 = rows;
            
            db.pool.query(query7, function(error, rows, fields){           
                res.render('reviews', {reviews: result1, gameIDs: result2, userIDs: rows});    
            })
        })             
    })                                                     
});

// Add a Review
app.post('/add-review-form', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    
    // Create the query and run it on the database
    query1 = `INSERT INTO Reviews (userID, gameID, reviewRating, reviewDescription) 
                VALUES (NULLIF(${data.userID}, 'NULL'), '${data.gameID}', '${data.reviewRating}', '${data.reviewDescription}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            res.redirect('/reviews');
            console.log(error);
            console.log("Invalid entry");
        }
        else
        {
            res.redirect('/reviews');
        }
    })
});

// Remove Review
app.delete('/delete-review-ajax/', function(req, res, next){
    let data = req.body;
    let reviewID = parseInt(data.id);
    let deleteReview = `DELETE FROM Reviews WHERE reviewID = ?`;

          // Run the 1st query
          db.pool.query(deleteReview, [reviewID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else
              {
                  // Run the second query
                  res.sendStatus(204);
              }
  })});

// Update a Review
app.put('/put-review-ajax', function(req,res,next){
    let data = req.body;
    console.log(data);

    let reviewID = parseInt(data.reviewID);
    let userID = parseInt(data.userID);
    let gameID = parseInt(data.gameID);
    let reviewRating = data.reviewRating;
    let reviewDescription = data.reviewDescription;

    let queryUpdateReview = `UPDATE Reviews SET userID = NULLIF(${data.userID}, 'NULL'), gameID = "${gameID}", reviewRating = "${reviewRating}", 
                                reviewDescription = "${reviewDescription}" WHERE reviewID = "${reviewID}"`;
    let selectReview = `SELECT * FROM Reviews WHERE reviewID = "${reviewID}"`

        // Run the 1st query
        db.pool.query(queryUpdateReview, [reviewID, userID, gameID, reviewRating, reviewDescription], function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }

            // If there was no error, we run our second query and return that data so we can use it to update the
            // table on the front-end
            else
            {
                // Run the second query
                db.pool.query(selectReview, function(error, rows, fields) {

                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.send(rows);
                    }
                })
            }
})});


// Read Genres data
app.get('/genres', function(req, res){
    let query4 = 'SELECT * FROM Genres;';

    db.pool.query(query4, function(error, rows, fields){    

        res.render('genres', {data: rows});                 
    })                                                     
});


// Add a Genre
app.post('/add-genre-form', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Genres (genreName) VALUES ('${data.genreName}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            res.redirect('/genres')
            console.log("Invalid entry");
        }
        else
        {
            res.redirect('/genres')
        }
    })
});

// Delete a Genre  
app.delete('/delete-genre-ajax', function(req, res, next){
    let data = req.body;
    let genreID = parseInt(data.id);
    let deleteGenre = `DELETE FROM Genres WHERE genreID = ?`;

          // Run the 1st query
          db.pool.query(deleteGenre, [genreID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else
              {
                  // Run the second query
                  res.sendStatus(204);
              }
  })});


//Update a Genre
app.put('/put-genre-ajax', function(req,res,next){
    let data = req.body;

    let genreID = parseInt(data.genreID);
    let genreName = data.genreName;
    console.log(genreID);
    let queryUpdateGenre = `UPDATE Genres SET genreName = "${genreName}" WHERE genreID = "${genreID}"`;
    let selectGenre = `SELECT * FROM Genres WHERE genreID = "${genreID}"`

        // Run the 1st query
        db.pool.query(queryUpdateGenre, [genreID, genreName], function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }

            // If there was no error, we run our second query and return that data so we can use it to update the 
            // table on the front-end
            else
            {
                // Run the second query
                db.pool.query(selectGenre, [genreName], function(error, rows, fields) {

                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.send(rows);
                    }
                })
            }
})});


// Read Games_Genres data
app.get('/games_genres', function(req, res){
    let query5 = 'SELECT * FROM Games_Genres;';
    let query6 = 'SELECT gameID, gameTitle FROM Games;';
    let query7 = 'SELECT genreID, genreName FROM Genres;';

    db.pool.query(query5, function(error, rows, fields){  
        results1 = rows;  

        db.pool.query(query6, function(error, rows, fields){    
            results2 = rows;

            db.pool.query(query7, function(error, rows, fields){   
                res.render('games_genres', {Games_Genres: results1, GameIDs: results2, GenreIDs: rows});                 
            })                 
        })                
    })                                                     
});

// Add Games_Genres relationship 
app.post('/add-game-genre-form/', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Games_Genres (genreID, gameID) VALUES ('${data.genreID}', '${data.gameID}')`;
    db.pool.query(query1, function(error, rows, fields){

        console.log(data)

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            res.redirect('/games_genres')
            console.log("Invalid entry");
        }
        else
        {
            res.redirect('/games_genres')
        }
    })
});

// Remove (delete) Games_Genres relationship
app.delete('/delete-game-genre-ajax/', function(req, res, next){
    let data = req.body;
    let gameGenreID = parseInt(data.id);
    let deleteGameGenre = `DELETE FROM Games_Genres WHERE gameGenreID = ?`;

          // Run the 1st query
          db.pool.query(deleteGameGenre, [gameGenreID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else
              {
                  // Run the second query
                  res.sendStatus(204);
              }
  })});



// Read Users_Games data
app.get('/users_games', function(req, res){
    let query5 = 'SELECT * FROM Users_Games;';
    let query6 = 'SELECT gameID, gameTitle FROM Games;';
    let query7 = 'SELECT userID, userName FROM Users;';

    db.pool.query(query5, function(error, rows, fields){    
        result1 = rows;
        db.pool.query(query6, function(error, rows, fields){
            result2 = rows;
            
            db.pool.query(query7, function(error, rows, fields){
                res.render('users_games', {usersGames: result1, gameIDs: result2, userIDs: rows});    
            })
        })             
    })                                                     
});

// Add Users_Games
app.post('/add-user-game-form', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Users_Games (userID, gameID) VALUES ('${data.userID}', '${data.gameID}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.redirect('/users_games')
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/users_games')
        }
    })
});

// Delete from Users_Games
app.delete('/delete-user-game-ajax', function(req, res, next){
    let data = req.body;
    let userGameID = parseInt(data.userGameID);
    let deleteUserGame = `DELETE FROM Users_Games WHERE userGameID = ?`;

          // Run the 1st query
          db.pool.query(deleteUserGame, [userGameID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else
              {
                  // Run the second query
                  res.sendStatus(204);
              }
  })});
/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});