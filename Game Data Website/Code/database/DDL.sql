SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Create Games table
CREATE OR REPLACE TABLE Games(
	gameID int(11) AUTO_INCREMENT NOT NULL,
    gameTitle varchar(45) NOT NULL UNIQUE,
    gameDescription text NOT NULL,
    gameRating decimal(4,2) NULL,
    gamePrice DECIMAL(7,2) NOT NULL,
    PRIMARY KEY (gameID)
);

INSERT INTO Games(gameTitle, gameDescription, gameRating, gamePrice) 
VALUES('Dauntless','A free-to-play, co-op action RPG with gameplay similar to Monster Hunter.', 8, 29.99),
('World of Tanks','If you like blowing up tanks, with a quick and intense game style you will love this game!', 9, 49.99),
('Warframe','A cooperative free-to-play third person online action shooter set in an stunning sci-fi world.', 8, 19.99),
('CRSED: F.O.A.D.','Take the battle royale genre and add  mystical powers and you have CRSED: F.O.A.D. (Aka Cuisine Royale: Second Edition)', 9, 19.99),
('Crossout', 'A post-apocalyptic MMO vehicle combat game!', 6, 22.99),
('Bass Monkey','Collect bananas, smack away hamsters, and try to get on the high score leaderboards as you battle through a 5 song EP.', 7, 12.99),
('Card Shark','Card Shark is an adventure game full of cunning, intrigue, and delectable deceit.', 9, 5),
('Billy101','Meet Billy, a robot who is tired of his work on the production lines', 8, 19.99),
('Tweleve Floors Below','A claustrophobic horror game taking place in an elevator.', 9, 18.99),
('Captain of Industry', 'Colony and factory simulation game', 6, 22.99),
('Square Journey','Square Journey is a minimalist arcade game', 6, 7),
('Tiny Folks','Train your folks, defeat monsters and upgrade your town!', 8, 9.99),
('Flight of Nova','Flight of Nova is a space and atmospheric flight simulator', 7, 19.99),
('Cheese Game','Armed with nothing more than a dash and a hunger for survival, fend off the beasts', 9, 14.99),
('Melania', 'Solve puzzles and find out all the secrets of the disappearance of civilization in a gloomy 2D platformer.', 6, 6);

 -- Create Genres table
CREATE OR REPLACE TABLE Genres(
	genreID int(11) AUTO_INCREMENT NOT NULL,
    genreName varchar(45) NOT NULL UNIQUE,
    PRIMARY KEY (genreID)
);

INSERT INTO Genres(genreName)
VALUES('Shooter'), ('Plarform'), ('RPG'), ('MMO'), ('Fighting'), ('Sports'), ('Military'), ('Casual'), ('Action'), ('Simulation'), 
		('Horror'), ('Anime'), ('Open World'), ('Racing'), ('Space'); 

-- Create Users table
CREATE OR REPLACE TABLE Users(
	userID int(11) AUTO_INCREMENT NOT NULL,
    userName varchar(45) NOT NULL UNIQUE,
    userEmail varchar(45) NOT NULL,
    userStoreCredit int(11) NOT NULL,
    PRIMARY KEY (userID)
);

INSERT INTO Users (userName, userEmail, userStoreCredit) 
VALUES ('nwillars0', 'egietz0@cargocollective.com', 433),
('calbrighton1', 'gelletson1@artisteer.com', 178),
('lshrimpton2', 'thandley2@yahoo.co.jp', 968),
('sfeldberger3', 'epoland3@baidu.com', 318),
('mpurdom4', 'mlorek4@4shared.com', 234),
('repentantemergency', 'benair15@hedvdeh.com', 145),
('heraldfault', 'gmd8@filevino.com', 489),
('moderngrubby', 'bobkoluda@flowersetcfresno.com', 923),
('unevenvirtual', 'poncecoronadonayeli@gmailni.com', 343),
('catshyster', 'jldusw@mp3u.us', 45),
('cureevent', 'clucvanen@bentsgolf.com', 434),
('energytruly', 'stuart1w@packiu.com', 324),
('buttonwrap', 'ekfudfcr@gemuk.buzz', 343),
('southernoriginally', 'krasotka2008@kimachina.com', 65),
('saddlefreedom', 'sergey1912@falixiao.com', 34);

 -- Create Reviews table
CREATE OR REPLACE TABLE Reviews(
	reviewID int(11) AUTO_INCREMENT NOT NULL,
    userID int(11) NULL,
    gameID int(11) NOT NULL,
    reviewRating int(11) NOT NULL,
    reviewDescription text NULL,
    FOREIGN KEY (userID) REFERENCES Users (userID) ON DELETE SET NULL,
	FOREIGN KEY (gameID) REFERENCES Games (gameID) ON DELETE CASCADE,
    PRIMARY KEY (reviewID)
);

INSERT INTO Reviews (userID, gameID, reviewRating, reviewDescription)
VALUES ((SELECT userID FROM Users where userID = 1), (SELECT gameID FROM Games where gameID = 5), 8, 'I saw one of these in Finland and I bought one.'),
((SELECT userID FROM Users where userID = 8), (SELECT gameID FROM Games where gameID = 7), 9, 'I saw one of these in Cote dIvoire and I bought one.'),
((SELECT userID FROM Users where userID = 11), (SELECT gameID FROM Games where gameID = 3), 7, 'heard about this on ndombolo radio, decided to give it a try.'),
((SELECT userID FROM Users where userID = 14), (SELECT gameID FROM Games where gameID = 15), 4, 'i use it for 10 weeks when im in my sauna.'),
((SELECT userID FROM Users where userID = 4), (SELECT gameID FROM Games where gameID = 9), 5, 'this video games is standard.'),
((SELECT userID FROM Users where userID = 6), (SELECT gameID FROM Games where gameID = 1), 8, 'heard about this on dance-rock radio, decided to give it a try.'),
((SELECT userID FROM Users where userID = 2), (SELECT gameID FROM Games where gameID = 12), 7, 'The box this comes in is 5 light-year by 6 foot and weights 17 megaton!!!'),
((SELECT userID FROM Users where userID = 1), (SELECT gameID FROM Games where gameID = 14), 9, 'My neighbor Krista has one of these. She works as a salesman and she says it looks soapy.'),
((SELECT userID FROM Users where userID = 13), (SELECT gameID FROM Games where gameID = 5), 10, 'I tried to shred it but got watermelon all over it.'),
((SELECT userID FROM Users where userID = 14), (SELECT gameID FROM Games where gameID = 1), 9, 'This game works excessively well. It speedily improves my baseball by a lot.'),
((SELECT userID FROM Users where userID = 9), (SELECT gameID FROM Games where gameID = 3), 10, 'My dog loves to play with it.'),
((SELECT userID FROM Users where userID = 10), (SELECT gameID FROM Games where gameID = 6), 9, 'My co-worker Mohamed has one of these. He says it looks brown.'),
((SELECT userID FROM Users where userID = 7), (SELECT gameID FROM Games where gameID = 7), 8, 'My neighbor Honora has one of these. She works as a reporter and she says it looks enormous.'),
((SELECT userID FROM Users where userID = 6), (SELECT gameID FROM Games where gameID = 8), 6, 'I tried to behead it but got truffle all over it.'),
((SELECT userID FROM Users where userID = 2), (SELECT gameID FROM Games where gameID = 1), 9, 'My raven loves to play with it.');

-- Create Games_Genres table
CREATE OR REPLACE TABLE Games_Genres(
	gameGenreID int(11) AUTO_INCREMENT NOT NULL,
	gameID int(11) NOT NULL,
    genreID int(11) NOT NULL,
	FOREIGN KEY (gameID) REFERENCES Games (gameID) ON DELETE CASCADE,
	FOREIGN KEY (genreID) REFERENCES Genres (genreID) ON DELETE CASCADE,
    CONSTRAINT uniqueGameGenre UNIQUE (gameID, genreID),
	PRIMARY KEY (gameGenreID)
);

INSERT INTO Games_Genres (gameID, genreID)
VALUES ((SELECT gameID FROM Games where gameID = 1), (SELECT genreID FROM Genres where genreID = 3)),
((SELECT gameID FROM Games where gameID = 11), (SELECT genreID FROM Genres where genreID = 1)),
((SELECT gameID FROM Games where gameID = 7), (SELECT genreID FROM Genres where genreID = 12)),
((SELECT gameID FROM Games where gameID = 5), (SELECT genreID FROM Genres where genreID = 10)),
((SELECT gameID FROM Games where gameID = 3), (SELECT genreID FROM Genres where genreID = 7)),
((SELECT gameID FROM Games where gameID = 2), (SELECT genreID FROM Genres where genreID = 4)),
((SELECT gameID FROM Games where gameID = 6), (SELECT genreID FROM Genres where genreID = 6)),
((SELECT gameID FROM Games where gameID = 11), (SELECT genreID FROM Genres where genreID = 13)),
((SELECT gameID FROM Games where gameID = 12), (SELECT genreID FROM Genres where genreID = 12)),
((SELECT gameID FROM Games where gameID = 15), (SELECT genreID FROM Genres where genreID = 4)),
((SELECT gameID FROM Games where gameID = 1), (SELECT genreID FROM Genres where genreID = 5)),
((SELECT gameID FROM Games where gameID = 5), (SELECT genreID FROM Genres where genreID = 11)),
((SELECT gameID FROM Games where gameID = 13), (SELECT genreID FROM Genres where genreID = 9)),
((SELECT gameID FROM Games where gameID = 10), (SELECT genreID FROM Genres where genreID = 8)),
((SELECT gameID FROM Games where gameID = 6), (SELECT genreID FROM Genres where genreID = 4));

-- Create Users_Games table
CREATE OR REPLACE TABLE Users_Games(
	userGameID int(11) AUTO_INCREMENT NOT NULL,
	userID int(11) NOT NULL,
    gameID int(11) NOT NULL,
	FOREIGN KEY (gameID) REFERENCES Games (gameID) ON DELETE CASCADE, 
	FOREIGN KEY (userID) REFERENCES Users (userID) ON DELETE CASCADE,
    CONSTRAINT uniqueUserGame UNIQUE (userID, gameID),
	PRIMARY KEY (userGameID)
);

INSERT INTO Users_Games (gameID, userID)
VALUES ((SELECT gameID FROM Games where gameID = 1), (SELECT userID FROM Users where userID = 3)),
((SELECT gameID FROM Games where gameID = 6), (SELECT userID FROM Users where userID = 11)),
((SELECT gameID FROM Games where gameID = 9), (SELECT userID FROM Users where userID = 2)),
((SELECT gameID FROM Games where gameID = 3), (SELECT userID FROM Users where userID = 5)),
((SELECT gameID FROM Games where gameID = 4), (SELECT userID FROM Users where userID = 7)),
((SELECT gameID FROM Games where gameID = 11), (SELECT userID FROM Users where userID = 12)),
((SELECT gameID FROM Games where gameID = 10), (SELECT userID FROM Users where userID = 11)),
((SELECT gameID FROM Games where gameID = 3), (SELECT userID FROM Users where userID = 2)),
((SELECT gameID FROM Games where gameID = 2), (SELECT userID FROM Users where userID = 15)),
((SELECT gameID FROM Games where gameID = 9), (SELECT userID FROM Users where userID = 14)),
((SELECT gameID FROM Games where gameID = 4), (SELECT userID FROM Users where userID = 10)),
((SELECT gameID FROM Games where gameID = 5), (SELECT userID FROM Users where userID = 9)),
((SELECT gameID FROM Games where gameID = 6), (SELECT userID FROM Users where userID = 4)),
((SELECT gameID FROM Games where gameID = 15), (SELECT userID FROM Users where userID = 5)),
((SELECT gameID FROM Games where gameID = 5), (SELECT userID FROM Users where userID = 7));

SET FOREIGN_KEY_CHECKS=1;
COMMIT;