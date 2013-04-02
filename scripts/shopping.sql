-- phpMyAdmin SQL Dump
-- version 3.5.7
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 02, 2013 at 04:31 PM
-- Server version: 5.5.21
-- PHP Version: 5.3.15

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `shopping`
--

-- --------------------------------------------------------

--
-- Table structure for table `item_master`
--

DROP TABLE IF EXISTS `item_master`;
CREATE TABLE IF NOT EXISTS `item_master` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `item_desc` varchar(255) NOT NULL,
  `location_id` int(11) NOT NULL,
  `item_aisle` varchar(150) NOT NULL,
  `item_price` int(11) NOT NULL,
  `item_photo` varchar(255) NOT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `shopping_list`
--

DROP TABLE IF EXISTS `shopping_list`;
CREATE TABLE IF NOT EXISTS `shopping_list` (
  `shopping_id` int(11) NOT NULL AUTO_INCREMENT,
  `shopping_list_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `purchase_flag` varchar(10) NOT NULL,
  `entry_date` datetime NOT NULL,
  `purchase_date` datetime NOT NULL,
  `item_priority` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`shopping_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `shopping_list_master`
--

DROP TABLE IF EXISTS `shopping_list_master`;
CREATE TABLE IF NOT EXISTS `shopping_list_master` (
  `shopping_ist_id` int(11) NOT NULL AUTO_INCREMENT,
  `shopping_list_desc` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `create_date` datetime NOT NULL,
  PRIMARY KEY (`shopping_ist_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `user_master`
--

DROP TABLE IF EXISTS `user_master`;
CREATE TABLE IF NOT EXISTS `user_master` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_password` varchar(20) NOT NULL,
  `user_enable` varchar(10) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
