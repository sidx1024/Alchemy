CREATE DATABASE  IF NOT EXISTS `timetable_laravel` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `timetable_laravel`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: timetable_laravel
-- ------------------------------------------------------
-- Server version	5.7.20-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `history_course_offered`
--

DROP TABLE IF EXISTS `history_course_offered`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `history_course_offered` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `profile_id` smallint(5) unsigned NOT NULL,
  `class_id` tinyint(3) unsigned NOT NULL,
  `batch` tinyint(4) NOT NULL,
  `course_id` smallint(5) unsigned NOT NULL,
  `course_type` tinyint(4) NOT NULL,
  `location_id` smallint(5) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `history_course_offered_profile_id_foreign` (`profile_id`),
  KEY `history_course_offered_class_id_foreign` (`class_id`),
  KEY `history_course_offered_course_id_foreign` (`course_id`),
  KEY `history_course_offered_location_id_foreign` (`location_id`),
  CONSTRAINT `history_course_offered_class_id_foreign` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`),
  CONSTRAINT `history_course_offered_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  CONSTRAINT `history_course_offered_location_id_foreign` FOREIGN KEY (`location_id`) REFERENCES `location` (`id`),
  CONSTRAINT `history_course_offered_profile_id_foreign` FOREIGN KEY (`profile_id`) REFERENCES `profile` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history_course_offered`
--

LOCK TABLES `history_course_offered` WRITE;
/*!40000 ALTER TABLE `history_course_offered` DISABLE KEYS */;
/*!40000 ALTER TABLE `history_course_offered` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-08 17:34:13
