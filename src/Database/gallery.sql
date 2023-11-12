-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 12, 2023 at 08:57 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gallery`
--

-- --------------------------------------------------------

--
-- Table structure for table `log_history`
--

CREATE TABLE `log_history` (
  `log_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `action` enum('query','update','delete') DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `query_details` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `log_history`
--

INSERT INTO `log_history` (`log_id`, `user_id`, `action`, `timestamp`, `query_details`) VALUES
(1, NULL, 'delete', '2023-10-08 15:02:32', 'Deleted folder with ID 19'),
(2, NULL, 'delete', '2023-10-08 15:07:09', 'Deleted folder. ID : 21'),
(3, NULL, 'delete', '2023-10-08 15:19:13', 'Deleted folder, ID : 16'),
(4, NULL, 'delete', '2023-10-08 15:19:51', 'Deleted folder, ID : 23'),
(5, NULL, 'delete', '2023-10-08 15:33:34', 'Deleted folder, ID : 24'),
(6, NULL, 'delete', '2023-10-08 15:34:46', 'Deleted folder, ID : 14'),
(7, NULL, 'delete', '2023-10-08 15:39:09', 'Deleted folder, ID : 29'),
(8, NULL, 'delete', '2023-10-08 15:40:59', 'Deleted folder, ID : 28'),
(9, NULL, 'delete', '2023-10-08 15:41:41', 'Deleted folder, ID : 27');

-- --------------------------------------------------------

--
-- Table structure for table `pictures`
--

CREATE TABLE `pictures` (
  `pic_id` int(11) NOT NULL,
  `pic_name` mediumblob NOT NULL,
  `folder_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `picture_folder`
--

CREATE TABLE `picture_folder` (
  `folder_id` int(11) NOT NULL,
  `year_id` int(11) NOT NULL,
  `folder_name` varchar(300) NOT NULL,
  `folder_status` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `picture_folder`
--

INSERT INTO `picture_folder` (`folder_id`, `year_id`, `folder_name`, `folder_status`) VALUES
(1, 1, 'Music concert', 1),
(2, 1, 'อาสาสมัคร', 1),
(3, 2, 'Archive_1', 0),
(4, 2, 'ปฐมนิเทศน์adasdsa', 1),
(6, 2, 'รับน้องCS', 0),
(7, 3, 'เปิดสายCS', 0),
(8, 2, 'งานวิ่ง', 1),
(9, 1, 'folder1', 0),
(25, 1, 'asdasd', 0),
(26, 1, 'xdxd', 0),
(30, 2, 'testt111', 0),
(31, 3, 'dfadasd', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `user_email` varchar(100) DEFAULT 'none',
  `user_phone` varchar(10) DEFAULT 'none',
  `user_type_id` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `user_email`, `user_phone`, `user_type_id`, `created_at`, `updated_at`) VALUES
(1, 'Thana', '058', 'xperm@gmail.com', '0912021251', 2, '2023-08-03 03:05:57', '2023-09-25 21:46:31'),
(2, 'Patipon', '123456789', 'Patipon@gmail.com', '0854542132', 2, '2023-08-03 03:05:49', '2023-09-25 21:46:39'),
(5, 'test3', 'test3', 'test3@gmail.com', NULL, 2, '2023-08-03 02:56:22', '2023-09-25 21:49:56'),
(7, 'test6', '$2b$10$cdcBTW5tQXfobvs1a2kSmeveB.9hN91ru7Vpx.IkD9XU6oi5BcWl.', 'test6@gmail.com', NULL, 1, '2023-08-01 10:07:46', '2023-09-25 21:34:09'),
(11, 'admin', '$2b$10$v23pVhhfa2WxsdPtUk43dO95o47ywC5/M6AucEHQmqvjJyWFJuGxi', 'admin@gmail.com', NULL, 2, '2023-08-02 00:25:41', '2023-08-02 00:25:41'),
(12, 'user', '$2b$10$qPAWR4/dDJwqLTFy6YGpWuDA.8YNMWB8oGU/JRXZmQR0oVm/n4rmK', 'user@gmail.com', NULL, 1, '2023-08-02 00:25:30', '2023-08-02 00:25:30'),
(14, 'owner', '$2b$10$Ej41EaOURK0uWBLzem2oROBwfRSk/Uh8O5aFW1TYHrZupfJrhSY56', 'owner@gmail.com', 'non', 2, '2023-08-03 03:12:35', '2023-08-03 03:12:35'),
(15, 'ban', '$2b$10$VUHBKyY4MRA0bpcopDkdgOYS3E6yeU5T4JKTvM4623RjMe6CrRX6O', 'ban@gmail.com', 'none', 0, '2023-08-07 10:03:15', '2023-08-08 00:26:14'),
(23, 'xd', '$2b$10$z4EAoZWx0Q5f18ES5LYAYu9S7udfr99fjTBtAIk9IMe.55Xnb1VZm', 'xpermaa', 'none', 0, '2023-10-06 15:37:53', '2023-10-06 15:37:53'),
(24, 'xxd', '$2b$10$nfDKVBbxscKggTfQ5bcTouNKPphYqc7nFOlFYvHviYz9TqfXbLvym', 'asd', 'none', 1, '2023-10-10 09:58:38', '2023-10-10 09:58:54');

-- --------------------------------------------------------

--
-- Table structure for table `user_type`
--

CREATE TABLE `user_type` (
  `user_type_id` tinyint(4) NOT NULL,
  `type_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_type`
--

INSERT INTO `user_type` (`user_type_id`, `type_name`) VALUES
(0, 'ระงับการใช้งาน'),
(1, 'ผู้ใช้งาน'),
(2, 'ผู้ดูแลระบบ'),
(3, 'เจ้าของระบบ');

-- --------------------------------------------------------

--
-- Table structure for table `years`
--

CREATE TABLE `years` (
  `year_id` int(11) NOT NULL,
  `year_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `years`
--

INSERT INTO `years` (`year_id`, `year_name`) VALUES
(1, '2022'),
(2, '2023'),
(3, '2024'),
(4, '2015'),
(5, '2011'),
(6, '2003'),
(7, '2023'),
(8, '2025'),
(9, '2028');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `log_history`
--
ALTER TABLE `log_history`
  ADD PRIMARY KEY (`log_id`);

--
-- Indexes for table `pictures`
--
ALTER TABLE `pictures`
  ADD PRIMARY KEY (`pic_id`),
  ADD KEY `folder_id` (`folder_id`);

--
-- Indexes for table `picture_folder`
--
ALTER TABLE `picture_folder`
  ADD PRIMARY KEY (`folder_id`),
  ADD KEY `FK_folder_year` (`year_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `FK_user_type_id` (`user_type_id`);

--
-- Indexes for table `user_type`
--
ALTER TABLE `user_type`
  ADD PRIMARY KEY (`user_type_id`);

--
-- Indexes for table `years`
--
ALTER TABLE `years`
  ADD PRIMARY KEY (`year_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `log_history`
--
ALTER TABLE `log_history`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `pictures`
--
ALTER TABLE `pictures`
  MODIFY `pic_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=154;

--
-- AUTO_INCREMENT for table `picture_folder`
--
ALTER TABLE `picture_folder`
  MODIFY `folder_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `years`
--
ALTER TABLE `years`
  MODIFY `year_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `pictures`
--
ALTER TABLE `pictures`
  ADD CONSTRAINT `pictures_ibfk_1` FOREIGN KEY (`folder_id`) REFERENCES `picture_folder` (`folder_id`);

--
-- Constraints for table `picture_folder`
--
ALTER TABLE `picture_folder`
  ADD CONSTRAINT `FK_folder_year` FOREIGN KEY (`year_id`) REFERENCES `years` (`year_id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FK_user_type_id` FOREIGN KEY (`user_type_id`) REFERENCES `user_type` (`user_type_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
