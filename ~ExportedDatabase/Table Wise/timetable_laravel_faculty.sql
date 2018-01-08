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
-- Table structure for table `faculty`
--

DROP TABLE IF EXISTS `faculty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `faculty` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `edited_id` smallint(5) unsigned DEFAULT NULL,
  `name` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alias` varchar(6) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(8) COLLATE utf8mb4_unicode_ci NOT NULL,
  `designation_id` tinyint(3) unsigned NOT NULL,
  `department_id` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `faculty_designation_id_foreign` (`designation_id`),
  KEY `faculty_department_id_foreign` (`department_id`),
  CONSTRAINT `faculty_department_id_foreign` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`),
  CONSTRAINT `faculty_designation_id_foreign` FOREIGN KEY (`designation_id`) REFERENCES `designation` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faculty`
--

LOCK TABLES `faculty` WRITE;
/*!40000 ALTER TABLE `faculty` DISABLE KEYS */;
INSERT INTO `faculty` VALUES (1,NULL,'Darshak G. Thakore','D.G.T','T130',3,3),(2,NULL,'Bhavesh A. Tanawala','B.A.T','T223',5,3),(3,NULL,'Mosin I. Hasan','M.I.H','T230',5,3),(4,NULL,'Kirti J. Sharma','K.J.S','T153',5,3),(5,NULL,'Narendra M. Patel','N.M.P','T123',4,3),(6,NULL,'IT Faculty - 1','IT-1','T500',5,9),(7,NULL,'IT Faculty - 2','IT-2','T501',5,9),(8,NULL,'IT Faculty - 3','IT-3','T502',5,9),(9,NULL,'IT Faculty - 4','IT-4','T503',4,9);
/*!40000 ALTER TABLE `faculty` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-08 17:34:11
