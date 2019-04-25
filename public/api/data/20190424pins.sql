-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Apr 25, 2019 at 05:34 AM
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
  `price` mediumint(5) UNSIGNED NOT NULL,
  `added` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `budget`
--

INSERT INTO `budget` (`id`, `trips_id`, `description`, `category`, `price`, `added`) VALUES
(1, 1, 'Return trip LAX-NAP', 'flight', 129500, '2019-04-16 14:58:18'),
(2, 1, 'Pizza', 'food', 77600, '2019-04-16 14:59:18'),
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
  `task_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint(1) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `current_todo`
--

INSERT INTO `current_todo` (`id`, `trips_id`, `task`, `task_date`, `status`) VALUES
(1, 1, 'Get some strawberry sorbet ice cream.', '2019-04-25 00:00:00', 0),
(2, 1, 'Visit Pompeii museum.', '2019-04-18 00:00:00', 0),
(3, 1, 'Visit Salerno', '2019-04-18 00:00:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `trips_id` int(11) UNSIGNED NOT NULL,
  `entry` text NOT NULL,
  `entry_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `image` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`id`, `trips_id`, `entry`, `entry_date`, `image`) VALUES
(1, 1, 'I went to Naples, Italy. Stayed in Ercolano. Had lots of ice cream and croissants.', '2019-04-15 00:00:00', NULL),
(2, 1, 'In Naples, all their plazas are preceded by Palazzo. Naples is right next to the beach and has a trash problem.', '2019-04-16 00:00:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pins`
--

CREATE TABLE `pins` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `trips_id` int(10) UNSIGNED NOT NULL,
  `latitude` int(11) UNSIGNED NOT NULL,
  `longitude` int(11) UNSIGNED NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `description` text NOT NULL,
  `added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pins`
--

INSERT INTO `pins` (`id`, `trips_id`, `latitude`, `longitude`, `name`, `description`, `added`) VALUES
(1, 1, 41, 14, NULL, 'Pin for Naples, Italy.\r\n', '2019-04-16 14:43:34');

-- --------------------------------------------------------

--
-- Table structure for table `trips`
--

CREATE TABLE `trips` (
  `id` int(10) UNSIGNED NOT NULL,
  `users_id` mediumint(8) UNSIGNED NOT NULL,
  `trips_name` varchar(250) NOT NULL,
  `region` varchar(100) DEFAULT NULL,
  `start` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `trips`
--

INSERT INTO `trips` (`id`, `users_id`, `trips_name`, `region`, `start`, `end`) VALUES
(1, 1, 'Naples Apr 2019', 'Italy', '2019-04-16 00:00:00', NULL);

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
(1, 'Quan Le', 'quandhle@gmail.com', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', 0),
(2, 'wassup', 'hello@email.com', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', 0);

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
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
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
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user_connections`
--
ALTER TABLE `user_connections`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;