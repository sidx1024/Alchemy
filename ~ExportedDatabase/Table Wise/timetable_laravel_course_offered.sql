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
-- Table structure for table `course_offered`
--

DROP TABLE IF EXISTS `course_offered`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_offered` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `profile_id` smallint(5) unsigned NOT NULL,
  `class_id` tinyint(3) unsigned NOT NULL,
  `batch` tinyint(4) NOT NULL,
  `course_id` smallint(5) unsigned NOT NULL,
  `course_type` tinyint(4) NOT NULL,
  `location_id` smallint(5) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `course_offered_profile_id_foreign` (`profile_id`),
  KEY `course_offered_class_id_foreign` (`class_id`),
  KEY `course_offered_course_id_foreign` (`course_id`),
  KEY `course_offered_location_id_foreign` (`location_id`),
  CONSTRAINT `course_offered_class_id_foreign` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`),
  CONSTRAINT `course_offered_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  CONSTRAINT `course_offered_location_id_foreign` FOREIGN KEY (`location_id`) REFERENCES `location` (`id`),
  CONSTRAINT `course_offered_profile_id_foreign` FOREIGN KEY (`profile_id`) REFERENCES `profile` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_offered`
--

LOCK TABLES `course_offered` WRITE;
/*!40000 ALTER TABLE `course_offered` DISABLE KEYS */;
INSERT INTO `course_offered` VALUES (1,1,1,0,1,0,1),(2,1,1,1,1,1,4),(3,1,1,2,1,1,4),(4,1,1,3,1,1,4),(5,1,1,4,1,1,4),(6,1,1,5,1,1,4),(7,1,1,0,2,0,1),(8,1,1,1,2,1,5),(9,1,1,2,2,1,5),(10,1,1,3,2,1,5),(11,1,1,4,2,1,5),(12,1,1,5,2,1,5),(13,1,2,0,7,0,2),(14,1,2,1,7,1,5),(15,1,2,2,7,1,5),(16,1,2,3,7,1,5),(17,1,2,4,7,1,5),(18,1,2,5,7,1,5),(19,1,2,0,8,0,2),(20,1,2,1,8,1,6),(21,1,2,2,8,1,6),(22,1,2,3,8,1,6),(23,1,2,4,8,1,6),(24,1,2,5,8,1,6),(25,1,3,0,15,0,2),(26,1,3,1,15,2,7),(27,1,3,2,15,2,7),(28,1,3,3,15,2,7),(29,1,3,4,15,2,7),(30,1,3,5,15,2,7),(31,1,3,0,14,0,2),(32,1,3,1,14,1,8),(33,1,3,2,14,1,8),(34,1,3,3,14,1,8),(35,1,3,4,14,1,8),(36,1,3,5,14,1,8),(37,1,4,0,20,0,9),(38,1,4,1,20,1,12),(39,1,4,2,20,1,12),(40,1,4,3,20,1,12),(41,1,4,4,20,1,12),(42,1,4,5,20,1,12),(43,1,4,0,21,0,9),(44,1,4,1,21,1,13),(45,1,4,2,21,1,13),(46,1,4,3,21,1,13),(47,1,4,4,21,1,13),(48,1,4,5,21,1,13),(49,1,5,0,22,0,10),(50,1,5,1,22,1,13),(51,1,5,2,22,1,13),(52,1,5,3,22,1,13),(53,1,5,4,22,1,13),(54,1,5,5,22,1,13),(55,1,5,0,23,0,10),(56,1,5,1,23,1,14),(57,1,5,2,23,1,14),(58,1,5,3,23,1,14),(59,1,5,4,23,1,14),(60,1,5,5,23,1,14),(61,1,6,0,25,0,11),(62,1,6,1,25,2,15),(63,1,6,2,25,2,15),(64,1,6,3,25,2,15),(65,1,6,4,25,2,15),(66,1,6,5,25,2,15),(67,1,6,0,24,0,11),(68,1,6,1,24,1,16),(69,1,6,2,24,1,16),(70,1,6,3,24,1,16),(71,1,6,4,24,1,16),(72,1,6,5,24,1,16);
/*!40000 ALTER TABLE `course_offered` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-08 17:34:14
