-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Apr 19, 2019 at 04:43 PM
-- Server version: 5.7.25
-- PHP Version: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `2.19wickedsales`
--
CREATE DATABASE IF NOT EXISTS `2.19wickedsales` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `2.19wickedsales`;

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `item_count` smallint(5) UNSIGNED NOT NULL,
  `total_price` mediumint(8) UNSIGNED NOT NULL,
  `created` datetime NOT NULL,
  `users_id` bigint(20) UNSIGNED NOT NULL,
  `changed` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `item_count`, `total_price`, `created`, `users_id`, `changed`) VALUES
(1, 59, 89157, '2019-04-11 15:08:59', 1, '2019-04-12 19:47:39'),
(2, 1, 1292, '2019-04-12 16:40:27', 1, '2019-04-12 23:40:27'),
(3, 1, 12933, '2019-04-15 17:13:08', 1, '2019-04-16 00:13:08'),
(4, 3, 13651, '2019-04-17 16:31:30', 1, '2019-04-17 23:31:49');

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `products_id` mediumint(8) UNSIGNED NOT NULL,
  `carts_id` mediumint(8) UNSIGNED NOT NULL,
  `quantity` smallint(5) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cart_items`
--

INSERT INTO `cart_items` (`id`, `products_id`, `carts_id`, `quantity`) VALUES
(1, 3, 1, 25),
(2, 1, 1, 2),
(3, 5, 1, 7),
(13, 6, 1, 1),
(15, 2, 1, 22),
(32, 4, 1, 2),
(33, 2, 2, 1),
(34, 1, 3, 1),
(35, 1, 4, 1),
(36, 3, 4, 2);

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `products_id` mediumint(8) UNSIGNED NOT NULL,
  `url` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `products_id`, `url`) VALUES
(1, 1, 'images/wallyBearbrick1.jpg'),
(2, 1, 'images/wallyBearbrick2.jpg'),
(3, 1, 'images/wallyBearbrick3.jpg'),
(4, 2, 'images/wallyBooks1.jpg'),
(5, 2, 'images/wallyBooks2.jpg'),
(6, 2, 'images/wallyBooks3.jpg'),
(7, 2, 'images/wallyBooks4.jpg'),
(8, 3, 'images/wallyCup1.jpg'),
(9, 3, 'images/wallyCup2.jpg'),
(10, 3, 'images/wallyCup3.jpg'),
(11, 3, 'images/wallyCup4.jpg'),
(12, 3, 'images/wallyCup5.jpg'),
(13, 4, 'images/wallyFind1.jpg'),
(14, 4, 'images/wallyFind2.jpg'),
(15, 4, 'images/wallyFind3.jpg'),
(16, 4, 'images/wallyFind4.jpg'),
(17, 5, 'images/wallyPuzzle1.jpg'),
(18, 5, 'images/wallyPuzzle2.jpg'),
(19, 5, 'images/wallyPuzzle3.jpg'),
(20, 5, 'images/wallyPuzzle4.jpg'),
(21, 6, 'images/wallyToy1.jpg'),
(22, 6, 'images/wallyToy2.jpg'),
(23, 6, 'images/wallyToy3.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `name` varchar(30) NOT NULL,
  `price` bigint(20) UNSIGNED NOT NULL,
  `description` text NOT NULL,
  `misc_details` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `description`, `misc_details`) VALUES
(1, 'Wally Be@rBrick', 12933, 'Where’s Wally? brightened many a childhood, and we finally found him in the highly collectible BE@RBRICK series!\r\nHe’s rocking his blue jeans, red and white striped shirt, and hat as always.', '{\"size\":\"11\\\"\",\"produced\":\"Limited Edition\",\"medium\":\"ABS plastic\",\"released\":2018}'),
(2, 'Wally Books', 1292, 'An activity book that features Wally, along with his friends, who are fiendishly hidden in every scene.', '{\"set\":\"4 Books\", \"pages\": 32,\"language\":\"English\",\"dimensions\":\"10 x 0.2 x 12.4 inches\",\"shipping weight\":\"12.6 oz\"}'),
(3, 'Wally on the Cup', 359, 'Found Wally and friends? They\'re hanging off the edge of the cup to lighten the mood.', '{\"size\":\"2\\\"\",\"medium\":\"ABS plastic\",\"manufacturer\":\"Kitan Club\"}'),
(4, 'Find Wally', 2000, 'Where\'s Wally? is a British series of children\'s puzzle books created by English illustrator Martin Handford. The books consist of a series of detailed double-page spread illustrations depicting dozens or more people doing a variety of amusing things at a given location.', '{\"hat\":\"Red and White Stripes\",\"shirt\":\"Red and White Stripes\",\"pants\":\"Blue Jeans\",\"shoes\":\"Brown\",\"accessories\":[\"Glasses\",\"Cane\"]}'),
(5, 'Wally Puzzle', 2999, 'Fantastic Where\'s Wally puzzle designed to celebrate the 21st Anniversary of this publishing phenomenon. Created by Martin Handford and first published in 1987, Where\'s Wally is one of the most recognizable characters in the world and a pop-culture icon. Distinctively dressed wearing a red and white striped sweater, black framed glasses and a bobble hat, Wally is a word traveller, always in search of the next adventure.', '{\"size\":\"18.9 x 26.8 inches\",\"age\":\"12+\",\"pieces\":1000}'),
(6, 'Wally Figurine', 899, 'Can you find Wally? Wally has jumped out from the pages of his books and into your home or office. Make it a game hiding the Where\'s Wally? somewhere in your house—dangling from a chandelier perhaps, or in a cabinet, or under a pillow. Whoever finds him moves him to a new hiding place, and the game continues! You are sure to have countless hours of fun with the Where\'s Wally?', '{\"size\":\"6\\\"\",\"medium\":\"Plastic\",\"age\":\"3+\",\"type\":[\"Action Figurines\",\"Bendable\"]}');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(1, 'Jen', 'jen@email.com', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8');

-- --------------------------------------------------------

--
-- Table structure for table `user_connections`
--

CREATE TABLE `user_connections` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `token` varchar(40) NOT NULL,
  `users_id` bigint(20) UNSIGNED NOT NULL,
  `created` datetime NOT NULL,
  `ip_address` varchar(14) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_connections`
--

INSERT INTO `user_connections` (`id`, `token`, `users_id`, `created`, `ip_address`) VALUES
(1, 'ef08e515e31b499308e046fa7949a6f2995ac702', 1, '2019-04-11 12:21:14', '::1'),
(2, '05b6297077c94496b3904fb3c9dfa04aec56c271', 1, '2019-04-11 12:30:24', '::1'),
(3, '79d7fcebb41fd08413008bda183000dda893602a', 1, '2019-04-11 12:42:47', '::1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cartproduct` (`carts_id`,`products_id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_connections`
--
ALTER TABLE `user_connections`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_connections`
--
ALTER TABLE `user_connections`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- Database: `c2.19db`
--
CREATE DATABASE IF NOT EXISTS `c2.19db` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `c2.19db`;

-- --------------------------------------------------------

--
-- Table structure for table `grades`
--

CREATE TABLE `grades` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `surname` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `givenname` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `course` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `grade` tinyint(3) UNSIGNED NOT NULL,
  `added` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `grades`
--

INSERT INTO `grades` (`id`, `surname`, `givenname`, `course`, `grade`, `added`) VALUES
(1, 'Bear', 'Polar', 'Algebra', 80, '2019-03-21 15:53:46'),
(2, 'Hammington', 'William', 'Bill for short', 100, '2019-03-21 15:55:25'),
(3, 'Gee', 'Robert', 'Bob for short', 60, '2019-03-21 15:57:59'),
(4, 'Feet', 'Happy', 'Penguin Dance', 99, '2019-03-21 16:09:42'),
(5, 'Slow', 'Sloth', 'Lag', 100, '2019-03-21 16:10:16'),
(6, 'Cali', 'Cheyenne', 'Fashionista', 70, '2019-03-21 16:11:22'),
(7, 'Rangers', 'Power', 'Posing', 89, '2019-03-21 16:12:09'),
(8, 'Precious', 'Cherry', 'Fruit', 99, '2019-03-21 16:13:41'),
(9, 'Hairy', 'Canary', 'Rhyme', 50, '2019-03-21 16:15:05'),
(12, 'Gilmore', 'Isla', 'eat oranges', 87, '2019-03-21 16:18:19'),
(14, 'Avila', 'Taha', 'Short Name', 90, '2019-03-21 16:19:25'),
(15, 'Shortwood', 'Lilian', 'Awesome', 99, '2019-03-21 16:20:09'),
(16, 'Flowers', 'Carole', 'Flowery', 59, '2019-03-21 16:20:46'),
(17, 'Huffman', 'Hugh', 'Double H', 98, '2019-03-21 16:21:28'),
(18, 'Royce', 'Derrick', 'Music', 89, '2019-03-21 16:22:32'),
(19, 'Brett', 'Kristian', 'Arts', 78, '2019-03-21 16:22:56'),
(22, 'Lai', 'Jen', 'Japanese', 79, '2019-03-22 15:07:10'),
(25, 'Bob', 'Sponge', 'Pineapple', 90, '2019-03-22 15:43:32');

-- --------------------------------------------------------

--
-- Table structure for table `grades_old`
--

CREATE TABLE `grades_old` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `grade` tinyint(3) UNSIGNED NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `course` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `added` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `grades_old`
--

INSERT INTO `grades_old` (`id`, `grade`, `name`, `course`, `added`) VALUES
(1, 30, 'Jen', 'Listen', '2019-03-21 13:12:26'),
(2, 83, 'John', 'Math', '2019-03-21 13:13:11'),
(3, 32, 'Bob', 'English', '2019-03-21 13:14:26'),
(4, 98, 'Cole', 'French', '2019-03-21 13:14:53'),
(5, 89, 'Don', 'Spanish', '2019-03-21 13:15:33'),
(6, 86, 'Franchesca', 'Japanese', '2019-03-21 13:16:06');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `grades`
--
ALTER TABLE `grades`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `grades_old`
--
ALTER TABLE `grades_old`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `grades`
--
ALTER TABLE `grades`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `grades_old`
--
ALTER TABLE `grades_old`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- Database: `multi-tablepractice`
--
CREATE DATABASE IF NOT EXISTS `multi-tablepractice` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `multi-tablepractice`;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `ID` mediumint(8) UNSIGNED NOT NULL,
  `given_name` varchar(30) NOT NULL,
  `family_name` varchar(30) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(64) NOT NULL,
  `status` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`ID`, `given_name`, `family_name`, `email`, `password`, `status`) VALUES
(1, 'Chuck', 'Tomai', 'somedude@someserver.com', '06cf73d585b182a85d0270a5ebb9f3768ebfbe18', 1),
(2, 'Jane', 'Doe', 'somewhere@overtherainbow.com', '48a3218fa3bacb1d5d1cdb56ae2d7f7808d4a036', 1),
(3, 'Stan', 'TheMan', 'superawesome@cantstopwontstop.com', 'd8e9031e962f8a22a7443c1748960090e85ad6c3', 1),
(4, 'Tabula', 'Rasa', 'failedmmo@sadpanda.com', 'f2b8e82e40773a667ebcabc658a0b6d3b8b9974b', 1);

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `ID` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(30) NOT NULL,
  `price` float NOT NULL,
  `status` tinyint(3) UNSIGNED NOT NULL,
  `type` enum('shoes','shirt','pants') NOT NULL,
  `added` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`ID`, `name`, `price`, `status`, `type`, `added`) VALUES
(1, 'hiking boots', 19.99, 1, 'shoes', '2016-03-15 12:14:23'),
(2, 'dress shoes', 35.99, 1, 'shoes', '2016-03-15 12:14:23'),
(3, 'dinner shoes', 129.99, 1, 'shoes', '2016-03-15 14:27:53'),
(4, 'dinner pants', 40, 1, 'pants', '2016-03-15 14:27:53'),
(5, 'dress pants', 48, 1, 'pants', '2016-03-15 14:27:53'),
(6, 'flower pants', 22.3, 1, 'pants', '2016-03-15 14:27:53'),
(7, 'short pants', 15.99, 1, 'pants', '2016-03-15 14:27:53'),
(8, 'hawaiiain shirt', 9.99, 1, 'shirt', '2016-03-15 14:29:22'),
(9, 'dress shirt', 22.32, 1, 'shirt', '2016-03-15 14:29:22'),
(10, 'chiffon shirt', 12.5, 1, 'shirt', '2016-03-15 14:29:22'),
(11, 't-shirt', 11.59, 1, 'shirt', '2016-03-15 14:29:22'),
(12, 'polo shirt', 15.66, 1, 'shirt', '2016-03-15 14:29:22');

-- --------------------------------------------------------

--
-- Table structure for table `purchases`
--

CREATE TABLE `purchases` (
  `ID` bigint(20) UNSIGNED NOT NULL,
  `item_id` mediumint(8) UNSIGNED NOT NULL,
  `customers_id` mediumint(8) UNSIGNED NOT NULL,
  `price` double NOT NULL,
  `item_count` int(10) UNSIGNED NOT NULL,
  `added` datetime NOT NULL,
  `status` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `purchases`
--

INSERT INTO `purchases` (`ID`, `item_id`, `customers_id`, `price`, `item_count`, `added`, `status`) VALUES
(1, 10, 1, 37.5, 3, '2016-03-22 09:00:00', 1),
(2, 9, 1, 156.24, 7, '2016-03-14 05:00:00', 1),
(3, 6, 1, 44.6, 2, '2016-02-15 19:00:00', 1),
(4, 11, 2, 69.54, 6, '2016-04-08 22:00:00', 1),
(5, 2, 2, 143.96, 4, '2016-03-24 03:00:00', 1),
(6, 9, 2, 223.2, 10, '2016-03-16 02:00:00', 1),
(7, 8, 2, 69.93, 7, '2016-04-20 12:00:00', 1),
(8, 6, 2, 89.2, 4, '2016-02-06 19:00:00', 1),
(9, 11, 3, 69.54, 6, '2016-03-30 07:00:00', 1),
(10, 5, 3, 384, 8, '2016-03-13 21:00:00', 1),
(11, 8, 3, 49.95, 5, '2016-02-15 02:00:00', 1),
(12, 3, 3, 1299.9, 10, '2016-04-21 09:00:00', 1),
(13, 6, 3, 89.2, 4, '2016-02-13 03:00:00', 1),
(14, 7, 3, 159.9, 10, '2016-01-18 01:00:00', 1),
(15, 9, 3, 66.96, 3, '2016-04-10 05:00:00', 1),
(16, 2, 3, 71.98, 2, '2016-02-20 06:00:00', 1),
(17, 9, 4, 66.96, 3, '2016-02-23 14:00:00', 1),
(18, 3, 4, 779.94, 6, '2016-01-14 08:00:00', 1),
(19, 4, 4, 40, 1, '2016-04-12 16:00:00', 1),
(20, 8, 4, 89.91, 9, '2016-02-20 12:00:00', 1),
(21, 5, 4, 144, 3, '2016-04-05 14:00:00', 1),
(22, 7, 4, 47.97, 3, '2016-03-22 22:00:00', 1),
(23, 12, 4, 93.96, 6, '2016-01-01 01:00:00', 1),
(24, 2, 4, 215.94, 6, '2016-01-18 03:00:00', 1),
(25, 9, 4, 200.88, 9, '2016-04-27 08:00:00', 1),
(26, 11, 4, 115.9, 10, '2016-02-12 13:00:00', 1),
(27, 6, 4, 178.4, 8, '2016-03-19 07:00:00', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `purchases`
--
ALTER TABLE `purchases`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `ID` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `purchases`
--
ALTER TABLE `purchases`
  MODIFY `ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
--
-- Database: `myFirst_db`
--
CREATE DATABASE IF NOT EXISTS `myFirst_db` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `myFirst_db`;

-- --------------------------------------------------------

--
-- Table structure for table `todo_item`
--

CREATE TABLE `todo_item` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `details` varchar(500) NOT NULL,
  `timestamp` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `todo_item`
--

INSERT INTO `todo_item` (`id`, `title`, `details`, `timestamp`, `user_id`) VALUES
(1, 'mysql', 'study mysql', 20190301, 1),
(2, 'php', 'study php', 20190302, 1),
(3, 'react', 'study react', 20190302, 1),
(4, 'db', 'study db', 20190304, 1),
(5, 'css', 'study css', 20190306, 1),
(6, 'html', 'study html', 20190306, 2),
(8, 'javascript', 'study javascript', 20190328, 2),
(9, 'mongoDB', 'study mongoDB', 20190316, 2),
(10, 'servers', 'study servers', 20190312, 2),
(11, 'angular', 'study angular', 20190318, 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL COMMENT 'User ID',
  `username` varchar(25) NOT NULL COMMENT 'User''s Username',
  `email` varchar(25) NOT NULL COMMENT 'User''s Email',
  `password` varchar(40) NOT NULL COMMENT 'User''s Password'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
(1, 'john_doe', 'awesome_john@email.com', 'klsjfaljflaj;afjlalfajo'),
(2, 'aiysha_barr', ' aiysha.barr@email.com', 'jsldfajl;sfjl;afjlafjafajwf');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `todo_item`
--
ALTER TABLE `todo_item`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `todo_item`
--
ALTER TABLE `todo_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'User ID', AUTO_INCREMENT=3;
--
-- Database: `myster_travel`
--
CREATE DATABASE IF NOT EXISTS `myster_travel` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `myster_travel`;

-- --------------------------------------------------------

--
-- Table structure for table `about_us`
--

CREATE TABLE `about_us` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `last_name` varchar(10) NOT NULL,
  `first_name` varchar(10) NOT NULL,
  `email` varchar(20) NOT NULL,
  `linkedin` varchar(15) NOT NULL,
  `portfolio` varchar(15) NOT NULL,
  `github` varchar(20) NOT NULL,
  `image` varchar(85) NOT NULL,
  `developer_story` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `about_us`
--

INSERT INTO `about_us` (`id`, `last_name`, `first_name`, `email`, `linkedin`, `portfolio`, `github`, `image`, `developer_story`) VALUES
(1, 'Lai', 'Jennifer', 'iclai.work@gmail.com', 'jen-icl', 'jen-icl.com', 'jen-icl', 'https://s3-us-west-1.amazonaws.com/myster-travel-images/about-us/laijen', ''),
(2, 'Chao', 'Kylie', '', '', '', 'kylieclin', 'https://s3-us-west-1.amazonaws.com/myster-travel-images/about-us/chaokylie', ''),
(3, 'Le', 'Quan', 'quandhle@gmail.com', 'quandhle', 'quandhle.com', 'quandhle', 'https://s3-us-west-1.amazonaws.com/myster-travel-images/about-us/lequan', ''),
(4, 'Poon', 'Westley', '', '', '', 'WestleyPoon', 'https://s3-us-west-1.amazonaws.com/myster-travel-images/about-us/lequan', '');

-- --------------------------------------------------------

--
-- Table structure for table `api_keys`
--

CREATE TABLE `api_keys` (
  `id` tinyint(3) UNSIGNED NOT NULL,
  `api` varchar(20) NOT NULL,
  `api_key` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `api_keys`
--

INSERT INTO `api_keys` (`id`, `api`, `api_key`) VALUES
(1, 'google', 'AIzaSyCz5y10D2RANKFguerczz92ZroUQcdLcMI');

-- --------------------------------------------------------

--
-- Table structure for table `budget`
--

CREATE TABLE `budget` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `trips_id` int(11) UNSIGNED NOT NULL,
  `description` varchar(100) NOT NULL,
  `category` varchar(20) NOT NULL,
  `price` mediumint(5) UNSIGNED NOT NULL,
  `added` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `budget`
--

INSERT INTO `budget` (`id`, `trips_id`, `description`, `category`, `price`, `added`) VALUES
(1, 1, 'Return trip LAX-NAP', 'flight', 129500, '2019-04-16 14:58:18'),
(2, 1, 'Pizza', 'food', 77600, '2019-04-16 14:58:18'),
(3, 1, 'Hotel', 'Accommodation', 92300, '2019-04-18 21:51:57'),
(4, 1, 'Boots', 'Shopping', 14057, '2019-04-18 22:50:11');

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `list_name` varchar(44) DEFAULT NULL,
  `list_code` varchar(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`id`, `list_name`, `list_code`) VALUES
(1, 'Afghanistan', 'AF'),
(2, 'Åland Islands', 'AX'),
(3, 'Albania', 'AL'),
(4, 'Algeria', 'DZ'),
(5, 'American Samoa', 'AS'),
(6, 'AndorrA', 'AD'),
(7, 'Angola', 'AO'),
(8, 'Anguilla', 'AI'),
(9, 'Antarctica', 'AQ'),
(10, 'Antigua and Barbuda', 'AG'),
(11, 'Argentina', 'AR'),
(12, 'Armenia', 'AM'),
(13, 'Aruba', 'AW'),
(14, 'Australia', 'AU'),
(15, 'Austria', 'AT'),
(16, 'Azerbaijan', 'AZ'),
(17, 'Bahamas', 'BS'),
(18, 'Bahrain', 'BH'),
(19, 'Bangladesh', 'BD'),
(20, 'Barbados', 'BB'),
(21, 'Belarus', 'BY'),
(22, 'Belgium', 'BE'),
(23, 'Belize', 'BZ'),
(24, 'Benin', 'BJ'),
(25, 'Bermuda', 'BM'),
(26, 'Bhutan', 'BT'),
(27, 'Bolivia', 'BO'),
(28, 'Bosnia and Herzegovina', 'BA'),
(29, 'Botswana', 'BW'),
(30, 'Bouvet Island', 'BV'),
(31, 'Brazil', 'BR'),
(32, 'British Indian Ocean Territory', 'IO'),
(33, 'Brunei Darussalam', 'BN'),
(34, 'Bulgaria', 'BG'),
(35, 'Burkina Faso', 'BF'),
(36, 'Burundi', 'BI'),
(37, 'Cambodia', 'KH'),
(38, 'Cameroon', 'CM'),
(39, 'Canada', 'CA'),
(40, 'Cape Verde', 'CV'),
(41, 'Cayman Islands', 'KY'),
(42, 'Central African Republic', 'CF'),
(43, 'Chad', 'TD'),
(44, 'Chile', 'CL'),
(45, 'China', 'CN'),
(46, 'Christmas Island', 'CX'),
(47, 'Cocos (Keeling) Islands', 'CC'),
(48, 'Colombia', 'CO'),
(49, 'Comoros', 'KM'),
(50, 'Congo', 'CG'),
(51, 'Congo', 'CD'),
(52, 'Cook Islands', 'CK'),
(53, 'Costa Rica', 'CR'),
(54, 'Cote D\'voire', 'CI'),
(55, 'Croatia', 'HR'),
(56, 'Cuba', 'CU'),
(57, 'Cyprus', 'CY'),
(58, 'Czech Republic', 'CZ'),
(59, 'Denmark', 'DK'),
(60, 'Djibouti', 'DJ'),
(61, 'Dominica', 'DM'),
(62, 'Dominican Republic', 'DO'),
(63, 'Ecuador', 'EC'),
(64, 'Egypt', 'EG'),
(65, 'El Salvador', 'SV'),
(66, 'Equatorial Guinea', 'GQ'),
(67, 'Eritrea', 'ER'),
(68, 'Estonia', 'EE'),
(69, 'Ethiopia', 'ET'),
(70, 'Falkland Islands (Malvinas)', 'FK'),
(71, 'Faroe Islands', 'FO'),
(72, 'Fiji', 'FJ'),
(73, 'Finland', 'FI'),
(74, 'France', 'FR'),
(75, 'French Guiana', 'GF'),
(76, 'French Polynesia', 'PF'),
(77, 'French Southern Territories', 'TF'),
(78, 'Gabon', 'GA'),
(79, 'Gambia', 'GM'),
(80, 'Georgia', 'GE'),
(81, 'Germany', 'DE'),
(82, 'Ghana', 'GH'),
(83, 'Gibraltar', 'GI'),
(84, 'Greece', 'GR'),
(85, 'Greenland', 'GL'),
(86, 'Grenada', 'GD'),
(87, 'Guadeloupe', 'GP'),
(88, 'Guam', 'GU'),
(89, 'Guatemala', 'GT'),
(90, 'Guernsey', 'GG'),
(91, 'Guinea', 'GN'),
(92, 'Guinea-Bissau', 'GW'),
(93, 'Guyana', 'GY'),
(94, 'Haiti', 'HT'),
(95, 'Heard Island and Mcdonald Islands', 'HM'),
(96, 'Holy See (Vatican City State)', 'VA'),
(97, 'Honduras', 'HN'),
(98, 'Hong Kong', 'HK'),
(99, 'Hungary', 'HU'),
(100, 'Iceland', 'IS'),
(101, 'India', 'IN'),
(102, 'Indonesia', 'ID'),
(103, 'Iran', 'IR'),
(104, 'Iraq', 'IQ'),
(105, 'Ireland', 'IE'),
(106, 'Isle of Man', 'IM'),
(107, 'Israel', 'IL'),
(108, 'Italy', 'IT'),
(109, 'Jamaica', 'JM'),
(110, 'Japan', 'JP'),
(111, 'Jersey', 'JE'),
(112, 'Jordan', 'JO'),
(113, 'Kazakhstan', 'KZ'),
(114, 'Kenya', 'KE'),
(115, 'Kiribati', 'KI'),
(116, 'Democratic People\'s Republic of Korea', 'KP'),
(117, 'Republic of Korea', 'KR'),
(118, 'Kuwait', 'KW'),
(119, 'Kyrgyzstan', 'KG'),
(120, 'Laos', 'LA'),
(121, 'Latvia', 'LV'),
(122, 'Lebanon', 'LB'),
(123, 'Lesotho', 'LS'),
(124, 'Liberia', 'LR'),
(125, 'Libyan Arab Jamahiriya', 'LY'),
(126, 'Liechtenstein', 'LI'),
(127, 'Lithuania', 'LT'),
(128, 'Luxembourg', 'LU'),
(129, 'Macao', 'MO'),
(130, 'Macedonia', 'MK'),
(131, 'Madagascar', 'MG'),
(132, 'Malawi', 'MW'),
(133, 'Malaysia', 'MY'),
(134, 'Maldives', 'MV'),
(135, 'Mali', 'ML'),
(136, 'Malta', 'MT'),
(137, 'Marshall Islands', 'MH'),
(138, 'Martinique', 'MQ'),
(139, 'Mauritania', 'MR'),
(140, 'Mauritius', 'MU'),
(141, 'Mayotte', 'YT'),
(142, 'Mexico', 'MX'),
(143, 'Micronesia', 'FM'),
(144, 'Moldova', 'MD'),
(145, 'Monaco', 'MC'),
(146, 'Mongolia', 'MN'),
(147, 'Montserrat', 'MS'),
(148, 'Morocco', 'MA'),
(149, 'Mozambique', 'MZ'),
(150, 'Myanmar', 'MM'),
(151, 'Namibia', 'NA'),
(152, 'Nauru', 'NR'),
(153, 'Nepal', 'NP'),
(154, 'Netherlands', 'NL'),
(155, 'Netherlands Antilles', 'AN'),
(156, 'New Caledonia', 'NC'),
(157, 'New Zealand', 'NZ'),
(158, 'Nicaragua', 'NI'),
(159, 'Niger', 'NE'),
(160, 'Nigeria', 'NG'),
(161, 'Niue', 'NU'),
(162, 'Norfolk Island', 'NF'),
(163, 'Northern Mariana Islands', 'MP'),
(164, 'Norway', 'NO'),
(165, 'Oman', 'OM'),
(166, 'Pakistan', 'PK'),
(167, 'Palau', 'PW'),
(168, 'Palestinian Territory, Occupied', 'PS'),
(169, 'Panama', 'PA'),
(170, 'Papua New Guinea', 'PG'),
(171, 'Paraguay', 'PY'),
(172, 'Peru', 'PE'),
(173, 'Philippines', 'PH'),
(174, 'Pitcairn', 'PN'),
(175, 'Poland', 'PL'),
(176, 'Portugal', 'PT'),
(177, 'Puerto Rico', 'PR'),
(178, 'Qatar', 'QA'),
(179, 'Reunion', 'RE'),
(180, 'Romania', 'RO'),
(181, 'Russian Federation', 'RU'),
(182, 'RWANDA', 'RW'),
(183, 'Saint Helena', 'SH'),
(184, 'Saint Kitts and Nevis', 'KN'),
(185, 'Saint Lucia', 'LC'),
(186, 'Saint Pierre and Miquelon', 'PM'),
(187, 'Saint Vincent and the Grenadines', 'VC'),
(188, 'Samoa', 'WS'),
(189, 'San Marino', 'SM'),
(190, 'Sao Tome and Principe', 'ST'),
(191, 'Saudi Arabia', 'SA'),
(192, 'Senegal', 'SN'),
(193, 'Serbia and Montenegro', 'CS'),
(194, 'Seychelles', 'SC'),
(195, 'Sierra Leone', 'SL'),
(196, 'Singapore', 'SG'),
(197, 'Slovakia', 'SK'),
(198, 'Slovenia', 'SI'),
(199, 'Solomon Islands', 'SB'),
(200, 'Somalia', 'SO'),
(201, 'South Africa', 'ZA'),
(202, 'South Georgia and the South Sandwich Islands', 'GS'),
(203, 'Spain', 'ES'),
(204, 'Sri Lanka', 'LK'),
(205, 'Sudan', 'SD'),
(206, 'Suriname', 'SR'),
(207, 'Svalbard and Jan Mayen', 'SJ'),
(208, 'Swaziland', 'SZ'),
(209, 'Sweden', 'SE'),
(210, 'Switzerland', 'CH'),
(211, 'Syrian Arab Republic', 'SY'),
(212, 'Taiwan', 'TW'),
(213, 'Tajikistan', 'TJ'),
(214, 'Tanzania', 'TZ'),
(215, 'Thailand', 'TH'),
(216, 'Timor-Leste', 'TL'),
(217, 'Togo', 'TG'),
(218, 'Tokelau', 'TK'),
(219, 'Tonga', 'TO'),
(220, 'Trinidad and Tobago', 'TT'),
(221, 'Tunisia', 'TN'),
(222, 'Turkey', 'TR'),
(223, 'Turkmenistan', 'TM'),
(224, 'Turks and Caicos Islands', 'TC'),
(225, 'Tuvalu', 'TV'),
(226, 'Uganda', 'UG'),
(227, 'Ukraine', 'UA'),
(228, 'United Arab Emirates', 'AE'),
(229, 'United Kingdom', 'GB'),
(230, 'United States', 'US'),
(231, 'United States Minor Outlying Islands', 'UM'),
(232, 'Uruguay', 'UY'),
(233, 'Uzbekistan', 'UZ'),
(234, 'Vanuatu', 'VU'),
(235, 'Venezuela', 'VE'),
(236, 'Viet Nam', 'VN'),
(237, 'Virgin Islands, British', 'VG'),
(238, 'Virgin Islands, U.S.', 'VI'),
(239, 'Wallis and Futuna', 'WF'),
(240, 'Western Sahara', 'EH'),
(241, 'Yemen', 'YE'),
(242, 'Zambia', 'ZM'),
(243, 'Zimbabwe', 'ZW');

-- --------------------------------------------------------

--
-- Table structure for table `current_todo`
--

CREATE TABLE `current_todo` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `trips_id` int(10) UNSIGNED NOT NULL,
  `task` varchar(100) NOT NULL,
  `date` datetime NOT NULL,
  `status` tinyint(1) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `current_todo`
--

INSERT INTO `current_todo` (`id`, `trips_id`, `task`, `date`, `status`) VALUES
(1, 1, 'Get some strawberry sorbet ice cream.', '2019-04-25 00:00:00', 0),
(2, 1, 'Visit Pompeii museum.', '2019-04-18 00:00:00', 0),
(3, 1, 'Visit Salerno', '2019-04-18 00:00:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `diary`
--

CREATE TABLE `diary` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `trips_id` int(11) NOT NULL,
  `entry` text NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `diary`
--

INSERT INTO `diary` (`id`, `trips_id`, `entry`, `date`) VALUES
(1, 1, 'I went to Naples, Italy. Stayed in Ercolano. Had lots of ice cream and croissants.', '2019-04-24 00:00:00'),
(2, 1, 'In Naples, all their plazas are preceded by Palazzo. Naples is right next to the beach and has a trash problem.', '2019-04-25 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `pins`
--

CREATE TABLE `pins` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `trips_id` int(10) UNSIGNED NOT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `description` text NOT NULL,
  `added` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pins`
--

INSERT INTO `pins` (`id`, `trips_id`, `latitude`, `longitude`, `description`, `added`) VALUES
(1, 1, 40.8533, 14.3056, 'Pin for Naples, Italy.\r\n', '2019-04-16 14:43:34');

-- --------------------------------------------------------

--
-- Table structure for table `trips`
--

CREATE TABLE `trips` (
  `id` int(10) UNSIGNED NOT NULL,
  `users_id` mediumint(8) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `city` varchar(25) DEFAULT NULL,
  `country` varchar(25) NOT NULL,
  `arrival` datetime NOT NULL,
  `departure` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `trips`
--

INSERT INTO `trips` (`id`, `users_id`, `name`, `city`, `country`, `arrival`, `departure`) VALUES
(1, 1, 'Naples Apr 2019', 'Naples', 'Italy', '2019-04-16 00:00:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `last_name`, `first_name`, `email`, `password`) VALUES
(1, 'Le', 'Quan', 'quandhle@gmail.com', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8');

-- --------------------------------------------------------

--
-- Table structure for table `user_connections`
--

CREATE TABLE `user_connections` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `users_id` mediumint(9) NOT NULL,
  `created` datetime NOT NULL,
  `ip_address` varchar(20) NOT NULL,
  `token` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `about_us`
--
ALTER TABLE `about_us`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `api_keys`
--
ALTER TABLE `api_keys`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `budget`
--
ALTER TABLE `budget`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `current_todo`
--
ALTER TABLE `current_todo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `diary`
--
ALTER TABLE `diary`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pins`
--
ALTER TABLE `pins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trips`
--
ALTER TABLE `trips`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_connections`
--
ALTER TABLE `user_connections`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `about_us`
--
ALTER TABLE `about_us`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `api_keys`
--
ALTER TABLE `api_keys`
  MODIFY `id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `budget`
--
ALTER TABLE `budget`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=244;

--
-- AUTO_INCREMENT for table `current_todo`
--
ALTER TABLE `current_todo`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `diary`
--
ALTER TABLE `diary`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pins`
--
ALTER TABLE `pins`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `trips`
--
ALTER TABLE `trips`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_connections`
--
ALTER TABLE `user_connections`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- Database: `recipes`
--
CREATE DATABASE IF NOT EXISTS `recipes` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `recipes`;
