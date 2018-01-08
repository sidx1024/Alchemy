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
-- Table structure for table `course_offered_faculty`
--

DROP TABLE IF EXISTS `course_offered_faculty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_offered_faculty` (
  `course_offered_id` int(10) unsigned NOT NULL,
  `faculty_id` smallint(5) unsigned NOT NULL,
  KEY `course_offered_faculty_course_offered_id_foreign` (`course_offered_id`),
  KEY `course_offered_faculty_faculty_id_foreign` (`faculty_id`),
  CONSTRAINT `course_offered_faculty_course_offered_id_foreign` FOREIGN KEY (`course_offered_id`) REFERENCES `course_offered` (`id`),
  CONSTRAINT `course_offered_faculty_faculty_id_foreign` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_offered_faculty`
--

LOCK TABLES `course_offered_faculty` WRITE;
/*!40000 ALTER TABLE `course_offered_faculty` DISABLE KEYS */;
INSERT INTO `course_offered_faculty` VALUES (1,5),(2,2),(3,2),(4,2),(5,2),(6,2),(7,2),(8,3),(9,3),(10,3),(11,3),(12,3),(13,3),(14,4),(15,4),(16,4),(17,4),(18,4),(19,3),(20,5),(21,5),(22,5),(23,5),(24,5),(25,5),(26,4),(27,2),(28,2),(29,2),(30,2),(31,2),(32,5),(33,4),(34,3),(35,4),(36,5),(37,9),(38,6),(39,6),(40,6),(41,6),(42,6),(43,6),(44,7),(45,7),(46,7),(47,7),(48,7),(49,7),(50,8),(51,8),(52,8),(53,8),(54,8),(55,7),(56,9),(57,9),(58,9),(59,9),(60,9),(61,9),(62,8),(63,6),(64,6),(65,6),(66,6),(67,6),(68,9),(69,8),(70,7),(71,8),(72,9);
/*!40000 ALTER TABLE `course_offered_faculty` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-08 17:34:12
