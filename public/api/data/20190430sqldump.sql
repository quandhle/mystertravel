-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: May 01, 2019 at 06:32 AM
-- Server version: 5.7.25
-- PHP Version: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `myster_travel`
--

-- --------------------------------------------------------

--
-- Table structure for table `budget`
--

CREATE TABLE `budget` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `trips_id` int(11) UNSIGNED NOT NULL,
  `description` varchar(100) NOT NULL,
  `category` varchar(20) NOT NULL,
  `price` bigint(20) UNSIGNED NOT NULL,
  `added` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `budget`
--

INSERT INTO `budget` (`id`, `trips_id`, `description`, `category`, `price`, `added`, `updated`) VALUES
(1, 1, 'Flights', 'Flights', 129770, '2019-04-01 13:14:15', '2019-04-29 13:14:24'),
(2, 1, 'Extra fee for sticking my head out of the plane', 'Flights', 2345, '2019-04-01 15:38:14', '2019-04-30 16:01:09'),
(3, 1, 'Elephant ride', 'Tour', 12485, '2019-04-04 15:48:45', '2019-04-30 16:00:59'),
(4, 1, 'Fou fuo', 'Food', 3200, '2019-04-06 15:49:09', NULL),
(5, 1, 'Hotel', 'Accommodation', 23423, '2019-04-07 16:00:46', '2019-04-30 16:00:54'),
(6, 1, 'Rope Adventure', 'Tour', 19489, '2019-04-09 16:05:10', NULL),
(7, 1, 'Cheering on for Kenneth', 'Tour', 4598, '2019-04-11 16:05:54', '2019-04-30 16:06:01'),
(8, 1, 'Drinks', 'Drinks', 4267, '2019-04-12 16:06:17', NULL),
(9, 1, 'Pyramid Tour with my bro', 'Tour', 15598, '2019-04-15 16:06:30', NULL),
(10, 1, 'Drinks', 'Drinks', 4823, '2019-04-17 16:06:44', NULL),
(11, 1, 'Local Food', 'Food', 2387, '2019-04-17 00:00:00', NULL),
(12, 1, 'Horse Race Yeehaaa', 'Tour', 23423, '2019-04-18 00:00:00', NULL),
(13, 1, 'Tequila Shots', 'Drinks', 3289, '2019-04-18 16:07:27', NULL),
(14, 1, 'Selfie with the lions', 'Tour', 3423, '2019-04-19 00:00:00', NULL),
(15, 1, 'Drinks', 'Drinks', 2300, '2019-04-20 16:09:01', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `current_todo`
--

CREATE TABLE `current_todo` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `trips_id` int(10) UNSIGNED NOT NULL,
  `task` varchar(100) NOT NULL,
  `task_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint(1) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `trips_id` int(11) UNSIGNED NOT NULL,
  `entry` text NOT NULL,
  `entry_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `image` varchar(250) DEFAULT NULL,
  `updated` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`id`, `trips_id`, `entry`, `entry_date`, `image`, `updated`) VALUES
(1, 1, 'Africa, here I come!', '2019-04-01 12:00:00', 'https://myster-travel-images.s3.us-west-1.amazonaws.com/notes-images/trips_id%3D1/43F076BD00000578-0-image-a-1_1504634533040.jpg', NULL),
(2, 1, 'Enjoying the beaches in Dakhla', '2019-04-03 00:00:00', NULL, NULL),
(3, 1, 'Let\'s partaaaay', '2019-04-05 00:00:00', 'https://myster-travel-images.s3.us-west-1.amazonaws.com/notes-images/trips_id%3D1/3763.jpg', NULL),
(4, 1, 'Super baked...', '2019-04-06 00:00:00', 'https://myster-travel-images.s3.us-west-1.amazonaws.com/notes-images/trips_id%3D1/lava.jpg', NULL),
(5, 1, 'Fou fou... yum...', '2019-04-08 12:36:43', NULL, NULL),
(6, 1, 'Thanks bro! Excellent shot!', '2019-04-10 12:40:10', 'https://myster-travel-images.s3.us-west-1.amazonaws.com/notes-images/trips_id%3D1/dan-pyramid.jpg', NULL),
(7, 1, 'Shots, shots, shot shots', '2019-04-12 12:45:14', NULL, NULL),
(8, 1, 'Ostrich race time?!', '2019-04-14 12:46:58', 'https://myster-travel-images.s3.us-west-1.amazonaws.com/notes-images/trips_id%3D1/kenostrich.jpg', NULL),
(9, 1, 'Last city stop...... off to the wilderness next!', '2019-04-15 00:00:00', NULL, NULL),
(10, 1, 'A potential food source here...', '2019-04-16 09:34:23', 'https://myster-travel-images.s3.us-west-1.amazonaws.com/notes-images/trips_id%3D1/wild.jpg', NULL),
(11, 1, 'RUN RUN RUN!!', '2019-04-17 08:29:00', 'https://myster-travel-images.s3.us-west-1.amazonaws.com/notes-images/trips_id%3D1/quabrunning.jpg', NULL),
(12, 1, 'Horse race time!!', '2019-04-18 16:00:00', 'https://myster-travel-images.s3.us-west-1.amazonaws.com/notes-images/trips_id%3D1/horse.jpg', NULL),
(13, 1, 'New password: fluffylions', '2019-04-20 22:29:29', 'https://myster-travel-images.s3.us-west-1.amazonaws.com/notes-images/trips_id%3D1/Lion.jpg', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pins`
--

CREATE TABLE `pins` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `trips_id` int(10) UNSIGNED NOT NULL,
  `latitude` int(11) NOT NULL,
  `longitude` int(11) NOT NULL,
  `name` varchar(150) DEFAULT NULL,
  `description` text NOT NULL,
  `added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pins`
--

INSERT INTO `pins` (`id`, `trips_id`, `latitude`, `longitude`, `name`, `description`, `added`, `updated`) VALUES
(1, 1, 339715904, -68498129, 'Rabat', 'Stopping by Rabat', '2019-04-01 12:15:29', NULL),
(2, 1, 237221111, -159347384, 'Dakhla', 'Here at Dakhla in Western Sahara', '2019-04-02 09:17:50', NULL),
(3, 1, 180735299, -159582372, 'Nouakchott', 'Experiencing Nouakchott', '2019-04-03 12:18:52', NULL),
(4, 1, 147166770, -174676861, 'Dakar', 'Sailing in Dakar', '2019-04-04 12:21:02', NULL),
(5, 1, 96411855, -135784012, 'Conakry', 'Tried a savory pastry, Fou fou', '2019-04-07 12:34:29', NULL),
(6, 1, 63156068, -108073698, 'Monrovia', 'Walking down Monrovia', '2019-04-09 00:00:00', NULL),
(7, 1, 61256261, 12254183, 'Lome', 'Lome Monument de l\'independence', '2019-04-11 12:44:49', NULL),
(8, 1, 4161976, 94672676, 'Libreville', 'What to do in Libreville?', '2019-04-12 12:46:22', NULL),
(9, 1, -88146556, 132301756, 'Luanda', 'Last City Stop, Luanda', '2019-04-15 00:00:00', NULL),
(10, 1, -208137742, 166527099, 'Okonjima Nature Reserve', 'Okonjima Nature Reserve', '2019-04-19 12:51:25', NULL),
(11, 1, -339248685, 184240553, 'Cape Town', 'Went surfing!', '2019-04-20 07:05:40', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `trips`
--

CREATE TABLE `trips` (
  `id` int(10) UNSIGNED NOT NULL,
  `users_id` mediumint(8) UNSIGNED NOT NULL,
  `trips_name` varchar(250) NOT NULL,
  `start` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end` datetime DEFAULT NULL,
  `summary` text,
  `summary_image` varchar(250) DEFAULT NULL,
  `summary_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `trips`
--

INSERT INTO `trips` (`id`, `users_id`, `trips_name`, `start`, `end`, `summary`, `summary_image`, `summary_date`) VALUES
(1, 1, 'African Coastline Adventure', '2019-04-01 06:12:08', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` char(40) DEFAULT NULL,
  `is_guest` tinyint(1) UNSIGNED NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `password`, `is_guest`) VALUES
(1, 'Dan Paschal', 'dan@lfz.com', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_connections`
--

CREATE TABLE `user_connections` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `users_id` mediumint(9) NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ip_address` varchar(50) NOT NULL,
  `token` char(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

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
-- Indexes for table `notes`
--
ALTER TABLE `notes`
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
-- AUTO_INCREMENT for table `budget`
--
ALTER TABLE `budget`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `current_todo`
--
ALTER TABLE `current_todo`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `pins`
--
ALTER TABLE `pins`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

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
