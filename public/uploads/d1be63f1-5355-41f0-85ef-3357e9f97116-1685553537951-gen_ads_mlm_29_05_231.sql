-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 31, 2023 at 06:09 AM
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
-- Database: `gen_ads_mlm_29_05_23`
--

-- --------------------------------------------------------

--
-- Table structure for table `ads`
--

CREATE TABLE `ads` (
  `ads_id` bigint(255) NOT NULL,
  `title` varchar(100) NOT NULL,
  `duration` int(11) NOT NULL,
  `thumbnail_id` varchar(255) NOT NULL,
  `advertisement_type` enum('link','image','embed_code') NOT NULL,
  `advertisement_image_id` varchar(255) DEFAULT NULL,
  `advertisement_link` text DEFAULT NULL,
  `advertisement_embed_code` text DEFAULT NULL,
  `advertiser_link` text DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ads_income`
--

CREATE TABLE `ads_income` (
  `id` bigint(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `ads_income` bigint(255) NOT NULL,
  `package` varchar(255) NOT NULL,
  `date_completed` varchar(100) NOT NULL,
  `status` enum('credit') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `automatic_deposit_gateway`
--

CREATE TABLE `automatic_deposit_gateway` (
  `gateway_id` bigint(255) NOT NULL,
  `uid` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `last_modified` varchar(100) NOT NULL,
  `details` text NOT NULL,
  `status` enum('active','inactive') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `check_google_signup`
--

CREATE TABLE `check_google_signup` (
  `serial_id` bigint(255) NOT NULL,
  `google_id` varchar(100) NOT NULL,
  `google_email` varchar(255) NOT NULL,
  `type` enum('login','register') NOT NULL,
  `details` text NOT NULL,
  `status` enum('1','2') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `faq_list`
--

CREATE TABLE `faq_list` (
  `faq_id` bigint(255) NOT NULL,
  `question` varchar(200) NOT NULL,
  `answer` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `frontend_setting`
--

CREATE TABLE `frontend_setting` (
  `id` bigint(255) NOT NULL,
  `login` text DEFAULT NULL,
  `register` text DEFAULT NULL,
  `about_us` text DEFAULT NULL,
  `contact_us` text DEFAULT NULL,
  `terms_and_conditions` text DEFAULT NULL,
  `package` text DEFAULT NULL,
  `date` varchar(255) NOT NULL,
  `privacy` text DEFAULT NULL,
  `how_it_work` text DEFAULT NULL,
  `admin_login` text DEFAULT NULL,
  `faq` text DEFAULT NULL,
  `hero` text DEFAULT NULL,
  `privacy_policy` text DEFAULT NULL,
  `marketing_tool` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `file_id` bigint(255) NOT NULL,
  `file_src` text NOT NULL,
  `file_name` varchar(5000) NOT NULL,
  `type` enum('file','url','web') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kyc_setting`
--

CREATE TABLE `kyc_setting` (
  `kyc_id` int(11) NOT NULL,
  `label` varchar(255) NOT NULL,
  `type` enum('textarea','input','select','file','date') NOT NULL,
  `required` enum('required','optional') NOT NULL,
  `options` text DEFAULT NULL,
  `file_extensions` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `level_income`
--

CREATE TABLE `level_income` (
  `id` int(11) NOT NULL,
  `user_id` varchar(20) NOT NULL,
  `agent_id` varchar(20) NOT NULL,
  `income` int(11) NOT NULL,
  `created_at` varchar(20) NOT NULL,
  `level` int(11) NOT NULL,
  `status` enum('pending','credit') NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `login_session`
--

CREATE TABLE `login_session` (
  `id` bigint(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `session_id` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `valid_till` varchar(255) NOT NULL,
  `user_ip` varchar(255) NOT NULL,
  `user_browser` varchar(255) NOT NULL,
  `user_os` varchar(255) NOT NULL,
  `user_device` varchar(255) NOT NULL,
  `user_location` varchar(255) NOT NULL,
  `status` enum('active','expired') NOT NULL DEFAULT 'active',
  `role` enum('user','admin') NOT NULL,
  `login_by` enum('user','admin') NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `manual_deposit_gateways`
--

CREATE TABLE `manual_deposit_gateways` (
  `gateway_id` bigint(255) NOT NULL,
  `gateway_name` varchar(255) NOT NULL,
  `logo_id` varchar(255) NOT NULL,
  `processing_time` varchar(255) NOT NULL,
  `status` enum('active','inactive') NOT NULL,
  `labels` text NOT NULL,
  `date_created` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `otps`
--

CREATE TABLE `otps` (
  `otp_id` bigint(255) NOT NULL,
  `otp` bigint(255) NOT NULL,
  `otp_sender` varchar(255) NOT NULL,
  `valid_till` varchar(255) NOT NULL,
  `status` enum('valid','invalid') NOT NULL DEFAULT 'valid',
  `purpose` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `packages`
--

CREATE TABLE `packages` (
  `package_id` bigint(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` bigint(255) NOT NULL,
  `level_income_upto` int(11) NOT NULL,
  `level_incomes` varchar(1000) NOT NULL,
  `ads_income` decimal(11,2) NOT NULL,
  `referral_income` decimal(11,2) NOT NULL,
  `validity` int(100) NOT NULL,
  `status` enum('active','inactive') NOT NULL,
  `is_recommended` enum('no','yes') DEFAULT 'no',
  `date_created` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `packages_history`
--

CREATE TABLE `packages_history` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `package_id` int(11) NOT NULL,
  `package` varchar(100) NOT NULL,
  `price` bigint(255) NOT NULL,
  `purchased_at` varchar(100) NOT NULL,
  `valid_till` varchar(100) NOT NULL,
  `status` enum('active','expired') NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment_transfer`
--

CREATE TABLE `payment_transfer` (
  `transfer_id` bigint(255) NOT NULL,
  `transaction_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `transfer_user_id` varchar(255) NOT NULL,
  `amount` decimal(65,2) NOT NULL,
  `charge` decimal(11,2) NOT NULL,
  `net_amount` decimal(11,2) NOT NULL,
  `date` varchar(100) NOT NULL,
  `action` enum('transferred','received') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reports_requests`
--

CREATE TABLE `reports_requests` (
  `id` int(11) NOT NULL,
  `type` enum('bug','feature') NOT NULL,
  `message` varchar(1000) NOT NULL,
  `date` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rewards_setting`
--

CREATE TABLE `rewards_setting` (
  `reward_id` int(11) NOT NULL,
  `rank` varchar(100) NOT NULL,
  `team` bigint(20) NOT NULL,
  `reward` bigint(20) NOT NULL,
  `capping` int(11) NOT NULL,
  `created_at` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `setting`
--

CREATE TABLE `setting` (
  `setting_id` bigint(255) NOT NULL,
  `mail_encryption` enum('ssl','tls') DEFAULT NULL,
  `mail_host` varchar(255) DEFAULT NULL,
  `mail_username` varchar(255) DEFAULT NULL,
  `mail_port` int(255) DEFAULT NULL,
  `mail_password` varchar(255) DEFAULT NULL,
  `web_logos` text DEFAULT NULL,
  `web_name` varchar(255) DEFAULT NULL,
  `currency` varchar(12) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `currency_position` enum('prefix','suffix') DEFAULT NULL,
  `primary_color` varchar(255) DEFAULT NULL,
  `timezone` varchar(255) DEFAULT NULL,
  `transfer_payment_charge` int(11) DEFAULT NULL,
  `notice` longtext DEFAULT NULL,
  `meta_title` varchar(200) DEFAULT NULL,
  `meta_description` varchar(1000) DEFAULT NULL,
  `meta_keywords` varchar(1000) DEFAULT NULL,
  `bonus_bv` int(255) DEFAULT NULL,
  `bonus_price` int(255) DEFAULT NULL,
  `email_preferences` text DEFAULT NULL,
  `kyc_preferences` text DEFAULT NULL,
  `site_preferences` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `support_tickets`
--

CREATE TABLE `support_tickets` (
  `ticket_id` bigint(255) NOT NULL,
  `creator` varchar(255) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `created_at` varchar(255) NOT NULL,
  `last_reply_on` varchar(255) DEFAULT NULL,
  `status` enum('pending','active','closed') NOT NULL,
  `closed_on` varchar(222) DEFAULT NULL,
  `closed_by` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `support_ticket_messages`
--

CREATE TABLE `support_ticket_messages` (
  `message_id` bigint(255) NOT NULL,
  `ticket_id` varchar(255) NOT NULL,
  `replier` varchar(255) NOT NULL,
  `message` varchar(3000) NOT NULL,
  `date` varchar(255) NOT NULL,
  `files` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `transaction_id` bigint(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `amount` decimal(25,2) NOT NULL,
  `transaction_charge` decimal(65,2) NOT NULL,
  `net_amount` decimal(65,2) NOT NULL,
  `description` text DEFAULT NULL,
  `category` text NOT NULL,
  `date` varchar(255) NOT NULL,
  `status` enum('credit','debit','pending','failed','capping') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `serial_id` bigint(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_name` varchar(30) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `avatar_id` bigint(255) DEFAULT NULL,
  `status` enum('active','blocked') NOT NULL,
  `login_verification` enum('off','on') NOT NULL DEFAULT 'off',
  `registration_date` varchar(255) NOT NULL,
  `mobile_number` bigint(255) DEFAULT NULL,
  `user_role` enum('user','admin') NOT NULL DEFAULT 'user',
  `user_gender` varchar(10) DEFAULT NULL,
  `user_dob` varchar(10) DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `country` varchar(30) DEFAULT NULL,
  `state` varchar(30) DEFAULT NULL,
  `city` varchar(30) DEFAULT NULL,
  `pin_code` int(6) DEFAULT NULL,
  `kyc` enum('pending','approved','rejected') DEFAULT NULL,
  `kyc_details` text DEFAULT NULL,
  `package_id` int(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users_tree`
--

CREATE TABLE `users_tree` (
  `tree_id` bigint(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `referral_id` varchar(255) NOT NULL,
  `placement_id` varchar(255) NOT NULL,
  `placement_type` enum('left','right') NOT NULL,
  `level` int(11) NOT NULL,
  `lft` bigint(255) NOT NULL,
  `rgt` bigint(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_deposits`
--

CREATE TABLE `user_deposits` (
  `deposit_id` bigint(255) NOT NULL,
  `transaction_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `amount` bigint(255) NOT NULL,
  `gateway_name` varchar(100) NOT NULL,
  `gateway_id` varchar(255) DEFAULT NULL,
  `payment_image_id` bigint(255) DEFAULT NULL,
  `requested_date` varchar(100) NOT NULL,
  `processed_date` varchar(100) DEFAULT NULL,
  `message` varchar(3000) DEFAULT NULL,
  `status` enum('review','approved','rejected','cancelled','failed','credit','pending') NOT NULL,
  `type` enum('manual','automatic','admin') NOT NULL,
  `razorpay_id` varchar(255) DEFAULT NULL,
  `paytm_id` varchar(255) DEFAULT NULL,
  `action_by` enum('user','admin') NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_kyc`
--

CREATE TABLE `user_kyc` (
  `kyc_id` bigint(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `requested_date` varchar(100) NOT NULL,
  `status` enum('pending','approved','rejected') NOT NULL,
  `rejected_reason` varchar(3000) DEFAULT NULL,
  `proceed_on` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_referrs`
--

CREATE TABLE `user_referrs` (
  `id` bigint(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `referral_id` varchar(255) NOT NULL,
  `referred_at` varchar(255) NOT NULL,
  `referral_income` decimal(11,2) NOT NULL,
  `package` varchar(100) DEFAULT NULL,
  `status` enum('pending','credit') NOT NULL DEFAULT 'pending',
  `activated_at` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_rewards`
--

CREATE TABLE `user_rewards` (
  `id` bigint(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `reward_id` varchar(255) NOT NULL,
  `reward` varchar(255) NOT NULL,
  `rank` varchar(255) NOT NULL,
  `team` int(11) NOT NULL,
  `status` enum('capping','credit') NOT NULL,
  `created_at` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_viewed_ads`
--

CREATE TABLE `user_viewed_ads` (
  `view_id` bigint(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `ads_id` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `first_number` int(11) NOT NULL,
  `second_number` int(11) NOT NULL,
  `date` varchar(100) DEFAULT NULL,
  `status` enum('pending','success') NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_withdrawals`
--

CREATE TABLE `user_withdrawals` (
  `withdraw_id` bigint(255) NOT NULL,
  `transaction_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `gateway` text NOT NULL,
  `amount` float(65,2) NOT NULL,
  `charge` float(65,2) NOT NULL,
  `net_amount` float(65,2) NOT NULL,
  `requested_date` varchar(255) NOT NULL,
  `processed_date` varchar(255) DEFAULT NULL,
  `db_labels` text DEFAULT NULL,
  `user_labels` text DEFAULT NULL,
  `status` enum('pending','rejected','success') NOT NULL,
  `message` varchar(3000) DEFAULT NULL,
  `action_by` enum('user','admin') NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_withdraw_gateways`
--

CREATE TABLE `user_withdraw_gateways` (
  `primary_id` bigint(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `gateway_id` varchar(255) NOT NULL,
  `labels` text NOT NULL,
  `date_created` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `withdraw_gateways`
--

CREATE TABLE `withdraw_gateways` (
  `gateway_id` bigint(255) NOT NULL,
  `gateway_name` varchar(255) NOT NULL,
  `logo_id` varchar(255) NOT NULL,
  `processing_time` varchar(255) NOT NULL,
  `status` enum('active','inactive') NOT NULL,
  `card_heading` varchar(255) NOT NULL,
  `labels` text NOT NULL,
  `date_created` varchar(255) NOT NULL,
  `minimum_withdrawal` int(255) NOT NULL,
  `maximum_withdrawal` int(255) NOT NULL,
  `withdrawal_charge` int(255) NOT NULL,
  `withdrawal_charge_type` enum('fixed','percentage') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ads`
--
ALTER TABLE `ads`
  ADD PRIMARY KEY (`ads_id`);

--
-- Indexes for table `ads_income`
--
ALTER TABLE `ads_income`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `automatic_deposit_gateway`
--
ALTER TABLE `automatic_deposit_gateway`
  ADD PRIMARY KEY (`gateway_id`);

--
-- Indexes for table `check_google_signup`
--
ALTER TABLE `check_google_signup`
  ADD PRIMARY KEY (`serial_id`);

--
-- Indexes for table `faq_list`
--
ALTER TABLE `faq_list`
  ADD PRIMARY KEY (`faq_id`);

--
-- Indexes for table `frontend_setting`
--
ALTER TABLE `frontend_setting`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`file_id`);

--
-- Indexes for table `kyc_setting`
--
ALTER TABLE `kyc_setting`
  ADD PRIMARY KEY (`kyc_id`);

--
-- Indexes for table `level_income`
--
ALTER TABLE `level_income`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `login_session`
--
ALTER TABLE `login_session`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `manual_deposit_gateways`
--
ALTER TABLE `manual_deposit_gateways`
  ADD PRIMARY KEY (`gateway_id`);

--
-- Indexes for table `otps`
--
ALTER TABLE `otps`
  ADD PRIMARY KEY (`otp_id`);

--
-- Indexes for table `packages`
--
ALTER TABLE `packages`
  ADD PRIMARY KEY (`package_id`);

--
-- Indexes for table `packages_history`
--
ALTER TABLE `packages_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment_transfer`
--
ALTER TABLE `payment_transfer`
  ADD PRIMARY KEY (`transfer_id`);

--
-- Indexes for table `reports_requests`
--
ALTER TABLE `reports_requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rewards_setting`
--
ALTER TABLE `rewards_setting`
  ADD PRIMARY KEY (`reward_id`);

--
-- Indexes for table `setting`
--
ALTER TABLE `setting`
  ADD PRIMARY KEY (`setting_id`);

--
-- Indexes for table `support_tickets`
--
ALTER TABLE `support_tickets`
  ADD PRIMARY KEY (`ticket_id`);

--
-- Indexes for table `support_ticket_messages`
--
ALTER TABLE `support_ticket_messages`
  ADD PRIMARY KEY (`message_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`transaction_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`serial_id`),
  ADD UNIQUE KEY `user_id` (`user_id`,`user_email`),
  ADD UNIQUE KEY `user_name` (`user_name`);

--
-- Indexes for table `users_tree`
--
ALTER TABLE `users_tree`
  ADD PRIMARY KEY (`tree_id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD UNIQUE KEY `user_id_2` (`user_id`);

--
-- Indexes for table `user_deposits`
--
ALTER TABLE `user_deposits`
  ADD PRIMARY KEY (`deposit_id`),
  ADD UNIQUE KEY `razorpay_id` (`razorpay_id`,`paytm_id`);

--
-- Indexes for table `user_kyc`
--
ALTER TABLE `user_kyc`
  ADD PRIMARY KEY (`kyc_id`);

--
-- Indexes for table `user_referrs`
--
ALTER TABLE `user_referrs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `user_rewards`
--
ALTER TABLE `user_rewards`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`,`reward_id`);

--
-- Indexes for table `user_viewed_ads`
--
ALTER TABLE `user_viewed_ads`
  ADD PRIMARY KEY (`view_id`);

--
-- Indexes for table `user_withdrawals`
--
ALTER TABLE `user_withdrawals`
  ADD PRIMARY KEY (`withdraw_id`);

--
-- Indexes for table `user_withdraw_gateways`
--
ALTER TABLE `user_withdraw_gateways`
  ADD PRIMARY KEY (`primary_id`);

--
-- Indexes for table `withdraw_gateways`
--
ALTER TABLE `withdraw_gateways`
  ADD PRIMARY KEY (`gateway_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ads`
--
ALTER TABLE `ads`
  MODIFY `ads_id` bigint(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ads_income`
--
ALTER TABLE `ads_income`
  MODIFY `id` bigint(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `automatic_deposit_gateway`
--
ALTER TABLE `automatic_deposit_gateway`
  MODIFY `gateway_id` bigint(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `check_google_signup`
--
ALTER TABLE `check_google_signup`
  MODIFY `serial_id` bigint(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `faq_list`
--
ALTER TABLE `faq_list`
  MODIFY `faq_id` bigint(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `frontend_setting`
--
ALTER TABLE `frontend_setting`
  MODIFY `id` bigint(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `file_id` bigint(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kyc_setting`
--
ALTER TABLE `kyc_setting`
  MODIFY `kyc_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `level_income`
--
ALTER TABLE `level_income`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `login_session`
--
ALTER TABLE `login_session`
  MODIFY `id` bigint(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `manual_deposit_gateways`
--
ALTER TABLE `manual_deposit_gateways`
  MODIFY `gateway_id` bigint(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `otps`
--
ALTER TABLE `otps`
  MODIFY `otp_id` bigint(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `packages`
--
ALTER TABLE `packages`
  MODIFY `package_id` bigint(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `packages_history`
--
ALTER TABLE `packages_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment_transfer`
--
ALTER TABLE `payment_transfer`
  MODIFY `transfer_id` bigint(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reports_requests`
--
ALTER TABLE `reports_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rewards_setting`
--
ALTER TABLE `rewards_setting`
  MODIFY `reward_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `setting`
--
ALTER TABLE `setting`
  MODIFY `setting_id` bigint(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `support_tickets`
--
ALTER TABLE `support_tickets`
  MODIFY `ticket_id` bigint(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `support_ticket_messages`
--
ALTER TABLE `support_ticket_messages`
  MODIFY `message_id` bigint(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `transaction_id` bigint(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `serial_id` bigint(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users_tree`
--
ALTER TABLE `users_tree`
  MODIFY `tree_id` bigint(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_deposits`
--
ALTER TABLE `user_deposits`
  MODIFY `deposit_id` bigint(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_kyc`
--
ALTER TABLE `user_kyc`
  MODIFY `kyc_id` bigint(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_referrs`
--
ALTER TABLE `user_referrs`
  MODIFY `id` bigint(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_rewards`
--
ALTER TABLE `user_rewards`
  MODIFY `id` bigint(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_viewed_ads`
--
ALTER TABLE `user_viewed_ads`
  MODIFY `view_id` bigint(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_withdrawals`
--
ALTER TABLE `user_withdrawals`
  MODIFY `withdraw_id` bigint(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_withdraw_gateways`
--
ALTER TABLE `user_withdraw_gateways`
  MODIFY `primary_id` bigint(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `withdraw_gateways`
--
ALTER TABLE `withdraw_gateways`
  MODIFY `gateway_id` bigint(255) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
