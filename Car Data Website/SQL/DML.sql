-- Read all games
SELECT * FROM Games;

-- Add a game
INSERT INTO Games (gameTitle, gameDescription, gameRating, gamePrice)
VALUES (:gameTitle, :gameDescription, :gameRating, :gamePrice)

-- Delete a game
DELETE FROM Games WHERE gameID = :selected_gameID

-- Update a game
UPDATE Games
SET gameTitle = :gameTitle, gameDescription = :gameDescription,
				gameRating = :gameRating, gamePrice = :gamePrice
WHERE id = :selected_id_from_page

-- Read all genres
SELECT genreID, genreGame FROM Genres;

-- Add a genre
INSERT INTO Genres (genreName) VALUES (:genreName)

-- Delete a genre 
DELETE FROM Genres WHERE genreID = :selected_genreID

-- Update a genre
UPDATE Genres 
SET genreName = :genreName WHERE genreID = :selected_genreID

-- Read all Users
SELECT userID, userName, userEmail, userStoreCredit FROM Users;

-- Add new User
INSERT INTO Users (userName, userEmail, userStoreCredit)
VALUES (:userName, :userEmail, :userStoreCredit)

-- Delete a User
DELETE FROM Users WHERE userID = :selected_userID

-- Update a User
UPDATE Users 
SET userName = :userName, userEmail = :userEmail, userStoreCredit = :userStoreCredit
WHERE id = :selected_userID

-- Read all Reviews
SELECT reviewID, userID, gameID, reviewRating, reviewDescription FROM Reviews
INNER JOIN Users ON userID = Users.userID
INNER JOIN Games ON gameID = Games.gameID;

-- Add a Review
INSERT INTO Reviews (userID, gameID, reviewRating, reviewDescription)
VALUES (:userID, :gameID, :reviewRating, :reviewDescription)

-- Delete a Review 
DELETE FROM Reviews WHERE reviewID = :selected_reviewID

-- Update a Review
UPDATE Reviews 
SET userID = :userID, gameID = :gameID, reviewRating = :reviewRating, reviewDescription = :reviewDescription
WHERE reviewID = :selected_reviewID

-- Read all Genres for Games
SELECT gameID, genreID FROM Games_Genres
INNER JOIN Genres On genreID = Genres.genreID
INNER JOIN Games ON gameID = Games.gameID;

-- Add new genre for game
INSERT INTO Games_Genres (gameID, genreID)
VALUES (:selected_gameID, :selected_genreID)

-- Delete a genre for game
DELETE FROM Games_Genres WHERE genreID = :selected_genreID

-- Read all Games in Users library
SELECT userID, gameID FROM Users_Games 
INNER JOIN Users On userID = Users.userID
INNER JOIN Games ON gameID = Games.gameID;

-- Add new game to Users 'library'
INSERT INTO Users_Games (userID, gameID)
VALUES (:userID, :gameID)

-- Delete game in Users 'library'
DELETE FROM Users_Games WHERE gameID = :selected_gameID