-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 21, 2019 at 02:34 PM
-- Server version: 10.3.16-MariaDB
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `watchflix`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `AddMainUser` (IN `userName` VARCHAR(50), IN `firstName` VARCHAR(50), IN `lastName` VARCHAR(50), IN `email` VARCHAR(50), IN `password` VARCHAR(50), IN `age` INT(10), IN `groupLimit` INT(10), OUT `userId` BIGINT(25), OUT `userGroupId` BIGINT(25))  NO SQL
BEGIN
	SET userGroupId = 0;
    
	INSERT INTO usergroup
    	(usergroup.Email,
         usergroup.TotalUser,
         usergroup.Limit)
    VALUES (email,
            1,
            groupLimit);
    
    SELECT Id
    INTO userGroupId
    FROM usergroup
    WHERE usergroup.Email = email;
    
    INSERT INTO user
    	(user.Username,
         user.FirstName,
         user.LastName,
         user.Email, 
         user.Password,
         user.Age,
         user.UserGroupId)
    VALUES (userName,
            firstName,
            lastName,
            email,
            password,
            age,
            userGroupId);
    SELECT Id
    INTO userId
    FROM user
    WHERE user.Email = email;       
     
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `AddUser` (IN `userName` VARCHAR(50), IN `firstName` VARCHAR(50), IN `lastName` VARCHAR(50), IN `email` VARCHAR(50), IN `password` VARCHAR(50), IN `age` INT(10), IN `userGroupId` BIGINT(25), OUT `userId` BIGINT(25))  NO SQL
BEGIN
	SET userId = 0;
    
    INSERT INTO user
    	(user.Username,
         user.FirstName,
         user.LastName,
         user.Email,
         user.Password,
         user.Age,
         user.UserGroupId)
	VALUES
    	(userName,
         firstName,
         lastName,
         email,
         password,
         age,
         userGroupId);
         
    SELECT user.Id
    INTO userId
    FROM user
    WHERE user.Email = email;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetNewMovieList` (IN `Age` INT(10))  NO SQL
BEGIN
	SELECT movies.Id, movies.Name, movies.Picture_Url, movies.Picture_Cover, movies.Picture_Local_Url
	FROM movies
    WHERE Age >= movies.Allowed_Age
    ORDER BY movies.Release_Date DESC
	LIMIT 30;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetRecentMovieList` (IN `UserId` BIGINT(25), IN `Age` INT(10))  NO SQL
BEGIN

SELECT user_movie_stream.Id, user_movie_stream.MovieId, movies.Name, movies.Picture_Url, movies.Picture_Cover, movies.Picture_Local_Url
FROM user_movie_stream
INNER JOIN movies
ON user_movie_stream.MovieId = movies.Id
WHERE Age >= movies.Allowed_Age
AND user_movie_stream.UserId = UserId
ORDER BY user_movie_stream.Last_Stream_Date DESC
LIMIT 30;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetTrendMovieList` (IN `Age` INT(10))  NO SQL
BEGIN
	SELECT movies.Id, movies.Name, movies.Picture_Url, movies.Picture_Cover, movies.Picture_Local_Url
	FROM movies
    WHERE Age >= movies.Allowed_Age
    ORDER BY movies.Total_Viewer DESC
	LIMIT 30;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetUserByUserId` (IN `userId` INT(25))  NO SQL
BEGIN
	SELECT user.Id, user.Username, user.Age
    FROM user
    WHERE user.Id = userId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetUsersByGroupId` (IN `userGroupId` BIGINT(25))  NO SQL
BEGIN
	SELECT user.Id, user.Username, user.Age
    FROM user
    WHERE user.UserGroupId = userGroupId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UserLogin` (IN `username` VARCHAR(50), IN `userpass` VARCHAR(50), OUT `userId` BIGINT(25), OUT `userGroupId` BIGINT(25))  BEGIN
	SELECT user.id, user.UserGroupId
    INTO userId, userGroupId
    FROM User
    WHERE User.Username = username AND User.Password = userpass
    LIMIT 1;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `Id` bigint(25) NOT NULL,
  `Name` varchar(50) NOT NULL DEFAULT '',
  `Full_Name` varchar(255) NOT NULL DEFAULT '',
  `Release_Date` datetime NOT NULL DEFAULT '0001-01-01 00:00:00',
  `Picture_Url` varchar(100) NOT NULL DEFAULT '' COMMENT 'Picture Url online',
  `Picture_Cover` blob NOT NULL DEFAULT '\'\'' COMMENT 'Picture within DB',
  `Picture_Local_Url` varchar(100) NOT NULL DEFAULT '' COMMENT 'Saved picture name inside image folder',
  `Total_Viewer` bigint(20) NOT NULL DEFAULT 0,
  `Allowed_Age` int(10) NOT NULL DEFAULT 18,
  `Synopsis` varchar(1000) NOT NULL DEFAULT '',
  `Running_Time` bigint(10) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`Id`, `Name`, `Full_Name`, `Release_Date`, `Picture_Url`, `Picture_Cover`, `Picture_Local_Url`, `Total_Viewer`, `Allowed_Age`, `Synopsis`, `Running_Time`) VALUES
(0, 'No Movie', 'No Movie', '0001-01-01 00:00:00', '', 0x2727, '', 0, 0, 'No Movie', 0),
(1, 'Avengers: Infinity War', 'Avengers: Infinity War (2018)', '2018-04-25 00:00:00', '', 0x2727, 'poster_scroll_1.jpg', 1542636, 13, 'Iron Man, Thor, the Hulk and the rest of the Avengers unite to battle their most powerful enemy yet -- the evil Thanos. On a mission to collect all six Infinity Stones, Thanos plans to use the artifacts to inflict his twisted will on reality. The fate of the planet and existence itself has never been more uncertain as everything the Avengers have fought for has led up to this moment.', 149),
(2, 'Logan', 'Logan (2017)', '2017-03-01 00:00:00', '', 0x2727, 'poster_scroll_2.jpg', 765895, 15, 'In the near future, a weary Logan (Hugh Jackman) cares for an ailing Professor X (Patrick Stewart) at a remote outpost on the Mexican border. His plan to hide from the outside world gets upended when he meets a young mutant (Dafne Keen) who is very much like him. Logan must now protect the girl and battle the dark forces that want to capture her.', 135),
(3, 'Ant-Man and the Wasp', 'Ant-Man and the Wasp (2018)', '2018-07-04 00:00:00', '', 0x2727, 'poster_scroll_3.jpg', 652352, 13, 'Scott Lang is grappling with the consequences of his choices as both a superhero and a father. Approached by Hope van Dyne and Dr. Hank Pym, Lang must once again don the Ant-Man suit and fight alongside the Wasp. The urgent mission soon leads to secret revelations from the past as the dynamic duo finds itself in an epic battle against a powerful new enemy.', 116),
(4, 'The Greatest Showman', 'The Greatest Showman (2017)', '2018-01-04 00:00:00', '', 0x2727, 'poster_scroll_4.jpg', 356242, 0, 'Inspired by the imagination of P. T. Barnum, The Greatest Showman is an original musical that celebrates the birth of show business & tells of a visionary who rose from nothing to create a spectacle that became a worldwide sensation.', 105),
(5, 'Maze Runner: The Death Cure', 'Maze Runner: The Death Cure (2018)', '2018-01-17 00:00:00', '', 0x2727, 'poster_scroll_5.jpg', 162325, 13, 'Thomas leads some escaped Gladers on their final and most dangerous mission yet. To save their friends, they must break into the legendary Last City, a WCKD-controlled labyrinth that may turn out to be the deadliest maze of all. Anyone who makes it out alive will get answers to the questions that the Gladers have been asking since they arrived in the maze.', 143),
(6, 'Aquaman', 'Aquaman (2018)', '2018-12-13 00:00:00', '', 0x2727, 'poster_scroll_6.jpg', 723541, 13, 'Once home to the most advanced civilization on Earth, the city of Atlantis is now an underwater kingdom ruled by the power-hungry King Orm. With a vast army at his disposal, Orm plans to conquer the remaining oceanic people -- and then the surface world. Standing in his way is Aquaman, Orm\'s half-human, half-Atlantean brother and true heir to the throne. With help from royal counselor Vulko, Aquaman must retrieve the legendary Trident of Atlan and embrace his destiny as protector of the deep.', 143),
(7, 'A Wrinkle in Time', 'A Wrinkle in Time (2018)', '2014-04-04 00:00:00', '', 0x2727, 'poster_scroll_7.jpg', 265354, 0, 'Meg Murry and her little brother, Charles Wallace, have been without their scientist father, Mr. Murry, for five years, ever since he discovered a new planet and used the concept known as a tesseract to travel there. Joined by Meg\'s classmate Calvin O\'Keefe and guided by the three mysterious astral travelers known as Mrs. Whatsit, Mrs. Who and Mrs. Which, the children brave a dangerous journey to a planet that possesses all of the evil in the universe.', 109),
(8, 'Moonlight', 'Moonlight (2016)', '2016-10-21 00:00:00', '', 0x2727, 'poster_scroll_8.jpg', 2356, 17, 'DescriptionA look at three defining chapters in the life of Chiron, a young black man growing up in Miami. His epic journey to manhood is guided by the kindness, support and love of the community that helps raise him.', 111),
(9, 'Aladdin', 'Aladdin (2019)', '2019-05-22 00:00:00', '', 0x2727, 'poster_scroll_9.jpg', 865231, 0, 'Aladdin is a lovable street urchin who meets Princess Jasmine, the beautiful daughter of the sultan of Agrabah. While visiting her exotic palace, Aladdin stumbles upon a magic oil lamp that unleashes a powerful, wisecracking, larger-than-life genie. As Aladdin and the genie start to become friends, they must soon embark on a dangerous mission to stop the evil sorcerer Jafar from overthrowing young Jasmine\'s kingdom.', 128),
(10, 'Dora and the Lost City of Gold', 'Dora and the Lost City of Gold (2019)', '2019-08-08 00:00:00', '', 0x2727, 'poster_scroll_10.jpg', 4576, 0, 'Having spent most of her life exploring the jungle, nothing could prepare Dora for her most dangerous adventure yet -- high school. Accompanied by a ragtag group of teens and Boots the monkey, Dora embarks on a quest to save her parents while trying to solve the seemingly impossible mystery behind a lost Incan civilization.', 0),
(11, 'Ghostbusters', 'Ghostbusters (2016)', '2016-07-14 00:00:00', '', 0x2727, 'poster_scroll_11.jpg', 465232, 13, 'Paranormal researcher Abby Yates (Melissa McCarthy) and physicist Erin Gilbert are trying to prove that ghosts exist in modern society. When strange apparitions appear in Manhattan, Gilbert and Yates turn to engineer Jillian Holtzmann for help. Also joining the team is Patty Tolan, a lifelong New Yorker who knows the city inside and out. Armed with proton packs and plenty of attitude, the four women prepare for an epic battle as more than 1,000 mischievous ghouls descend on Times Square.', 105),
(12, 'Blade Runner 2049', 'Blade Runner 2049 (2017)', '2017-10-05 00:00:00', '', 0x2727, 'poster_scroll_12.jpg', 165326, 17, 'Officer K (Ryan Gosling), a new blade runner for the Los Angeles Police Department, unearths a long-buried secret that has the potential to plunge what\'s left of society into chaos. His discovery leads him on a quest to find Rick Deckard (Harrison Ford), a former blade runner who\'s been missing for 30 years.', 0),
(13, 'A Star Is Born', 'A Star Is Born (2018)', '2018-10-04 00:00:00', '', 0x2727, 'poster_scroll_13.jpg', 462123, 15, 'Seasoned musician Jackson Maine discovers -- and falls in love with -- struggling artist Ally. She has just about given up on her dream to make it big as a singer until Jackson coaxes her into the spotlight. But even as Ally\'s career takes off, the personal side of their relationship is breaking down, as Jackson fights an ongoing battle with his own internal demons.', 136),
(14, 'Star Wars: The Last Jedi', 'Star Wars: Episode VIII - The Last Jedi (2017)', '2017-12-13 00:00:00', '', 0x2727, 'poster_scroll_14.jpg', 865352, 13, 'Luke Skywalker\'s peaceful and solitary existence gets upended when he encounters Rey, a young woman who shows strong signs of the Force. Her desire to learn the ways of the Jedi forces Luke to make a decision that changes their lives forever. Meanwhile, Kylo Ren and General Hux lead the First Order in an all-out assault against Leia and the Resistance for supremacy of the galaxy.', 152),
(15, 'Rogue One: A Star Wars Story', 'Rogue One: A Star Wars Story', '2016-12-14 00:00:00', '', 0x2727, 'poster_scroll_15.jpg', 892656, 13, 'Former scientist Galen Erso lives on a farm with his wife and young daughter, Jyn. His peaceful existence comes crashing down when the evil Orson Krennic takes him away from his beloved family. Many years later, Galen becomes the Empire\'s lead engineer for the most powerful weapon in the galaxy, the Death Star. Knowing that her father holds the key to its destruction, Jyn joins forces with a spy and other resistance fighters to steal the space station\'s plans for the Rebel Alliance.', 133),
(16, 'Tomorrowland', 'Tomorrowland (2015)', '2015-05-21 00:00:00', '', 0x2727, 'poster_scroll_16.jpg', 425632, 11, 'A former boy genius (George Clooney) and gifted teenager (Britt Robertson) set out on a dangerous mission to unearth the secrets of \"Tomorrowland\", an enigmatic location caught between time and space.', 130),
(17, 'Tomb Raider', 'Tomb Raider (2018)', '2018-03-15 00:00:00', '', 0x2727, 'poster_scroll_17.jpg', 352012, 13, 'Lara Croft is the fiercely independent daughter of an eccentric adventurer who vanished years earlier. Hoping to solve the mystery of her father\'s disappearance, Croft embarks on a perilous journey to his last-known destination -- a fabled tomb on a mythical island that might be somewhere off the coast of Japan. The stakes couldn\'t be higher as Lara must rely on her sharp mind, blind faith and stubborn spirit to venture into the unknown.', 118),
(18, 'Jumanji: Welcome to the Jungle', 'Jumanji: Welcome to the Jungle (2017)', '2017-12-21 00:00:00', '', 0x2727, 'poster_scroll_18.jpg', 678246, 13, 'Four high school kids discover an old video game console and are drawn into the game\'s jungle setting, literally becoming the adult avatars they chose. What they discover is that you don\'t just play Jumanji - you must survive it. To beat the game and return to the real world, they\'ll have to go on the most dangerous adventure of their lives, discover what Alan Parrish left 20 years ago, and change the way they think about themselves - or they\'ll be stuck in the game forever.', 119),
(19, 'See You Yesterday', 'See You Yesterday (2019)', '2019-05-03 00:00:00', '', 0x2727, 'poster_scroll_19.jpg', 15436, 14, 'Two teenage science prodigies spend every spare minute working on their latest homemade invention: backpacks that enable time travel. When one of their older brothers is killed, they put their unfinished project to the test to save him.', 87),
(20, 'Captain Marvel', 'Captain Marvel (2019)', '2019-03-06 00:00:00', '', 0x2727, 'poster_scroll_20.jpg', 350216, 13, 'Captain Marvel is an extraterrestrial Kree warrior who finds herself caught in the middle of an intergalactic battle between her people and the Skrulls. Living on Earth in 1995, she keeps having recurring memories of another life as U.S. Air Force pilot Carol Danvers. With help from Nick Fury, Captain Marvel tries to uncover the secrets of her past while harnessing her special superpowers to end the war with the evil Skrulls.', 124),
(21, 'Stranger Things', 'Stranger Things', '2016-07-15 00:00:00', '', 0x2727, 'poster_scroll_21.jpg', 953265, 13, 'In 1980s Indiana, a group of young friends witness supernatural forces and secret government exploits. As they search for answers, the children unravel a series of extraordinary mysteries.', 60),
(22, 'Spider-Man: Far From Home', 'Spider-Man: Far from Home (2019)', '2019-07-03 00:00:00', '', 0x2727, 'poster_scroll_22.jpg', 785345, 13, 'Following the events of Avengers: Endgame, Spider-Man must step up to take on new threats in a world that has changed forever.', 129);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `Id` bigint(25) NOT NULL,
  `Username` varchar(50) NOT NULL DEFAULT '',
  `FirstName` varchar(50) NOT NULL DEFAULT '',
  `LastName` varchar(50) NOT NULL DEFAULT '',
  `Email` varchar(50) NOT NULL DEFAULT '',
  `Password` varchar(50) NOT NULL DEFAULT '',
  `Age` int(10) NOT NULL DEFAULT 0,
  `UserGroupId` bigint(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`Id`, `Username`, `FirstName`, `LastName`, `Email`, `Password`, `Age`, `UserGroupId`) VALUES
(0, 'No User', 'No User', 'No User', 'nouser@no.com', 'NoUser', 0, 0),
(1, 'laras', 'Laras', '', 'larasras@live.com', 'be121740bf988b2225a313fa1f107ca1', 22, 1),
(4, 'eman', 'Eman', 'Cisa', 'emancisa@gmail.com', 'be121740bf988b2225a313fa1f107ca1', 22, 1),
(5, 'cisar', 'cisa', 'ruelele', 'cisaru@gmail.com', 'be121740bf988b2225a313fa1f107ca1', 24, 4),
(6, 'cisarJr1', 'Mutan', 'Jane', 'j@j.com', 'be121740bf988b2225a313fa1f107ca1', 34, 4);

-- --------------------------------------------------------

--
-- Table structure for table `usergroup`
--

CREATE TABLE `usergroup` (
  `Id` bigint(25) NOT NULL COMMENT 'Group Id',
  `TotalUser` int(10) NOT NULL DEFAULT 0 COMMENT 'Total User in 1 Group, Limit 5',
  `Email` varchar(50) NOT NULL DEFAULT '' COMMENT 'Main user email address',
  `Limit` int(10) NOT NULL DEFAULT 1 COMMENT 'Limit users in 1 group'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `usergroup`
--

INSERT INTO `usergroup` (`Id`, `TotalUser`, `Email`, `Limit`) VALUES
(0, 0, 'No Group', 9999),
(1, 1, 'larasras@live.com', 5),
(4, 1, 'cisaru@gmail.com', 5);

-- --------------------------------------------------------

--
-- Table structure for table `user_movie_stream`
--

CREATE TABLE `user_movie_stream` (
  `Id` bigint(25) NOT NULL,
  `UserId` bigint(25) NOT NULL DEFAULT 0,
  `MovieId` bigint(25) NOT NULL DEFAULT 0,
  `Last_Stream_Date` datetime NOT NULL DEFAULT '0001-01-01 00:00:00',
  `Last_Time_Watch` time NOT NULL DEFAULT '00:00:00',
  `Total_Stream` int(10) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_movie_stream`
--

INSERT INTO `user_movie_stream` (`Id`, `UserId`, `MovieId`, `Last_Stream_Date`, `Last_Time_Watch`, `Total_Stream`) VALUES
(0, 0, 0, '0001-01-01 00:00:00', '00:00:00', 0),
(3, 1, 1, '2019-07-20 20:52:01', '35:58:02', 5),
(4, 1, 15, '2019-07-20 17:23:20', '130:05:35', 6),
(5, 1, 18, '2019-07-15 22:16:52', '116:03:42', 2),
(6, 1, 21, '2019-07-19 23:15:23', '58:52:20', 6);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `User_Username_Unique` (`Username`),
  ADD UNIQUE KEY `User_Email_Unique` (`Email`),
  ADD KEY `FK_UserGroupId` (`UserGroupId`);

--
-- Indexes for table `usergroup`
--
ALTER TABLE `usergroup`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `UserGroup_Email_Unique` (`Email`);

--
-- Indexes for table `user_movie_stream`
--
ALTER TABLE `user_movie_stream`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `UserId_MovieId_Unique` (`UserId`,`MovieId`),
  ADD KEY `FK_MovieId` (`MovieId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `Id` bigint(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `Id` bigint(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `usergroup`
--
ALTER TABLE `usergroup`
  MODIFY `Id` bigint(25) NOT NULL AUTO_INCREMENT COMMENT 'Group Id', AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user_movie_stream`
--
ALTER TABLE `user_movie_stream`
  MODIFY `Id` bigint(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_UserGroupId` FOREIGN KEY (`UserGroupId`) REFERENCES `usergroup` (`Id`);

--
-- Constraints for table `user_movie_stream`
--
ALTER TABLE `user_movie_stream`
  ADD CONSTRAINT `FK_MovieId` FOREIGN KEY (`MovieId`) REFERENCES `movies` (`Id`),
  ADD CONSTRAINT `FK_UserId` FOREIGN KEY (`UserId`) REFERENCES `user` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
