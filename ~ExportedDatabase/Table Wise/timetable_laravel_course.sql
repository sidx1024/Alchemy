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
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `edited_id` smallint(5) unsigned DEFAULT NULL,
  `name` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alias` varchar(8) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(12) COLLATE utf8mb4_unicode_ci NOT NULL,
  `scheme` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `credit` tinyint(3) unsigned NOT NULL,
  `department_id` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `course_department_id_foreign` (`department_id`),
  CONSTRAINT `course_department_id_foreign` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (1,NULL,'Design and Analysis of Algorithm','D.A.A','CP135','410',5,3),(2,NULL,'Therory of Computation','T.O.C','CP131','210',3,3),(7,NULL,'Database Management System','D.B.M.S','CP234','410',5,3),(8,NULL,'Object Oriented Porgramming','OOP','CP230','210',3,3),(14,NULL,'Computer Organization and Architecture','C.O.A','CP320','210',3,3),(15,NULL,'Data Mining and Business Intelligence','D.M.B.I','CP310','401',5,3),(20,NULL,'Basic Electronics','B.E','CC110','410',5,9),(21,NULL,'Computer Workshop','C.W','CC111','210',3,9),(22,NULL,'Big Data Analytics','B.D.A','IT230','410',5,9),(23,NULL,'Mobile Computing','M.C','IT231','210',3,9),(24,NULL,'Computer Graphics','C.G','IT321','210',3,9),(25,NULL,'Advance Web Technology','A.W.T','IT322','401',5,9);
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
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
