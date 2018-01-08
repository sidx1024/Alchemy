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
-- Table structure for table `time_table`
--

DROP TABLE IF EXISTS `time_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `time_table` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `profile_id` smallint(5) unsigned NOT NULL,
  `from` tinyint(3) unsigned DEFAULT NULL,
  `to` tinyint(3) unsigned DEFAULT NULL,
  `day` enum('MON','TUE','WED','THU','FRI','SAT','SUN') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `course_offered_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `time_table_profile_id_foreign` (`profile_id`),
  KEY `time_table_course_offered_id_foreign` (`course_offered_id`),
  CONSTRAINT `time_table_course_offered_id_foreign` FOREIGN KEY (`course_offered_id`) REFERENCES `course_offered` (`id`),
  CONSTRAINT `time_table_profile_id_foreign` FOREIGN KEY (`profile_id`) REFERENCES `profile` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `time_table`
--

LOCK TABLES `time_table` WRITE;
/*!40000 ALTER TABLE `time_table` DISABLE KEYS */;
INSERT INTO `time_table` VALUES (1,1,11,12,'MON',1),(2,1,11,12,'TUE',1),(3,1,11,12,'WED',1),(4,1,11,12,'THU',1),(5,1,12,14,'MON',2),(6,1,13,15,'TUE',3),(7,1,14,16,'WED',4),(8,1,16,18,'THU',5),(9,1,11,13,'FRI',6),(10,1,14,16,'MON',7),(11,1,12,13,'TUE',7),(12,1,16,18,'MON',8),(13,1,16,18,'TUE',9),(14,1,16,18,'WED',10),(15,1,12,14,'THU',11),(16,1,12,14,'WED',12),(17,1,11,12,'MON',13),(18,1,11,12,'TUE',13),(19,1,11,12,'WED',13),(20,1,11,12,'THU',13),(21,1,12,14,'MON',14),(22,1,13,15,'TUE',15),(23,1,14,16,'WED',16),(24,1,16,18,'THU',17),(25,1,11,13,'FRI',18),(26,1,14,15,'MON',19),(27,1,12,13,'TUE',19),(28,1,16,18,'MON',20),(29,1,16,18,'TUE',21),(30,1,16,18,'WED',22),(31,1,12,14,'THU',23),(32,1,12,14,'WED',24),(33,1,12,13,'MON',25),(34,1,13,14,'TUE',25),(35,1,11,13,'TUE',26),(36,1,14,18,'MON',27),(37,1,13,15,'FRI',28),(38,1,14,16,'THU',29),(39,1,16,18,'FRI',30),(40,1,11,12,'MON',31),(41,1,11,12,'WED',31),(42,1,11,12,'THU',31),(43,1,11,12,'FRI',31),(44,1,13,14,'MON',32),(45,1,12,13,'FRI',33),(46,1,12,13,'THU',34),(47,1,17,18,'THU',35),(48,1,14,15,'TUE',36),(49,1,11,12,'MON',37),(50,1,11,12,'TUE',37),(51,1,11,12,'WED',37),(52,1,11,12,'THU',37),(53,1,12,14,'MON',38),(54,1,13,15,'TUE',39),(55,1,14,16,'WED',40),(56,1,16,18,'THU',41),(57,1,11,13,'FRI',42),(58,1,14,16,'MON',43),(59,1,12,13,'TUE',43),(60,1,16,18,'MON',44),(61,1,16,18,'TUE',45),(62,1,16,18,'WED',46),(63,1,12,14,'THU',47),(64,1,12,14,'WED',48),(65,1,11,12,'MON',49),(66,1,11,12,'TUE',49),(67,1,11,12,'WED',49),(68,1,11,12,'THU',49),(69,1,12,14,'MON',50),(70,1,13,15,'TUE',51),(71,1,14,16,'WED',52),(72,1,16,18,'THU',53),(73,1,11,13,'FRI',54),(74,1,14,15,'MON',55),(75,1,12,13,'TUE',55),(76,1,16,18,'MON',56),(77,1,16,18,'TUE',57),(78,1,16,18,'WED',58),(79,1,12,14,'THU',59),(80,1,12,14,'WED',60),(81,1,12,13,'MON',61),(82,1,13,14,'TUE',61),(83,1,11,13,'TUE',62),(84,1,14,18,'MON',63),(85,1,13,15,'FRI',64),(86,1,14,16,'THU',65),(87,1,16,18,'FRI',66),(88,1,11,12,'MON',67),(89,1,11,12,'WED',67),(90,1,11,12,'THU',67),(91,1,11,12,'FRI',67),(92,1,13,14,'MON',68),(93,1,12,13,'FRI',69),(94,1,12,13,'THU',70),(95,1,17,18,'THU',71),(96,1,14,15,'TUE',72);
/*!40000 ALTER TABLE `time_table` ENABLE KEYS */;
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
