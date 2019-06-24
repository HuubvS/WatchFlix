-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 24, 2019 at 11:07 PM
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
         firstName.
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetUsersByGroupId` (IN `userGroupId` BIGINT(25), OUT `userName` VARCHAR(50), OUT `age` INT(10), OUT `userId` BIGINT(25))  NO SQL
BEGIN
	SELECT user.Id, user.Username, user.Age
    INTO userId, userName, age
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
(1, 'laras', 'Laras', '', 'larasras@live.com', 'be121740bf988b2225a313fa1f107ca1', 22, 1);

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
(1, 1, 'larasras@live.com', 5);

--
-- Indexes for dumped tables
--

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `Id` bigint(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `usergroup`
--
ALTER TABLE `usergroup`
  MODIFY `Id` bigint(25) NOT NULL AUTO_INCREMENT COMMENT 'Group Id', AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_UserGroupId` FOREIGN KEY (`UserGroupId`) REFERENCES `usergroup` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
