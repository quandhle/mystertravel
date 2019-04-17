-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Apr 17, 2019 at 04:18 AM
-- Server version: 5.7.25
-- PHP Version: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `myster_travel`
--

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
  `image` varchar(50) NOT NULL,
  `developer_story` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `about_us`
--

INSERT INTO `about_us` (`id`, `last_name`, `first_name`, `email`, `linkedin`, `portfolio`, `github`, `image`, `developer_story`) VALUES
(1, 'Lai', 'Jennifer', 'iclai.work@gmail.com', 'jen-icl', 'jen-icl.com', 'jen-icl', '', ''),
(2, 'Chao', 'Kylie', '', '', '', 'kylieclin', '', ''),
(3, 'Le', 'Quan', 'quandhle@gmail.com', 'quandhle', 'quandhle.com', 'quandhle', '', ''),
(4, 'Poon', 'Westley', '', '', '', 'westleypoon', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `budget`
--

CREATE TABLE `budget` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `trips_id` smallint(6) NOT NULL,
  `category` varchar(20) NOT NULL,
  `price` mediumint(5) UNSIGNED NOT NULL,
  `added` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `budget`
--

INSERT INTO `budget` (`id`, `trips_id`, `category`, `price`, `added`) VALUES
(1, 1, 'flight', 129500, '2019-04-16 14:58:18'),
(2, 1, 'food', 77600, '2019-04-16 14:58:18'),
(3, 1, 'hotel', 92300, '2019-04-16 14:58:18');

-- --------------------------------------------------------

--
-- Table structure for table `current_todo`
--

CREATE TABLE `current_todo` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `trips_id` smallint(5) UNSIGNED NOT NULL,
  `task` varchar(100) NOT NULL,
  `date` datetime NOT NULL,
  `status` tinyint(1) NOT NULL
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
  `id` mediumint(8) UNSIGNED NOT NULL,
  `trips_id` smallint(6) NOT NULL,
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
  `id` smallint(5) UNSIGNED NOT NULL,
  `trips_id` smallint(6) NOT NULL,
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
  `id` smallint(5) UNSIGNED NOT NULL,
  `users_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `city` varchar(25) NOT NULL,
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
  `id` bigint(20) UNSIGNED NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `last_name`, `first_name`, `email`, `password`) VALUES
(1, 'Le', 'Quan', 'quandhle@gmail.com', 'password');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `about_us`
--
ALTER TABLE `about_us`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `budget`
--
ALTER TABLE `budget`
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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `about_us`
--
ALTER TABLE `about_us`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `budget`
--
ALTER TABLE `budget`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `current_todo`
--
ALTER TABLE `current_todo`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `diary`
--
ALTER TABLE `diary`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pins`
--
ALTER TABLE `pins`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `trips`
--
ALTER TABLE `trips`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
