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
-- Dumping data for table `class`
--

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;
INSERT INTO `class` VALUES (1,1,3,1,3),(2,2,3,2,3),(3,3,3,3,3),(4,1,9,9,9),(5,2,9,10,9),(6,3,9,11,9);
/*!40000 ALTER TABLE `class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (1,NULL,'Design and Analysis of Algorithm','D.A.A','CP135','410',5,3),(2,NULL,'Therory of Computation','T.O.C','CP131','210',3,3),(7,NULL,'Database Management System','D.B.M.S','CP234','410',5,3),(8,NULL,'Object Oriented Porgramming','OOP','CP230','210',3,3),(14,NULL,'Computer Organization and Architecture','C.O.A','CP320','210',3,3),(15,NULL,'Data Mining and Business Intelligence','D.M.B.I','CP310','401',5,3),(20,NULL,'Basic Electronics','B.E','CC110','410',5,9),(21,NULL,'Computer Workshop','C.W','CC111','210',3,9),(22,NULL,'Big Data Analytics','B.D.A','IT230','410',5,9),(23,NULL,'Mobile Computing','M.C','IT231','210',3,9),(24,NULL,'Computer Graphics','C.G','IT321','210',3,9),(25,NULL,'Advance Web Technology','A.W.T','IT322','401',5,9);
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `course_offered`
--

LOCK TABLES `course_offered` WRITE;
/*!40000 ALTER TABLE `course_offered` DISABLE KEYS */;
INSERT INTO `course_offered` VALUES (1,1,1,0,1,0,1),(2,1,1,1,1,1,4),(3,1,1,2,1,1,4),(4,1,1,3,1,1,4),(5,1,1,4,1,1,4),(6,1,1,5,1,1,4),(7,1,1,0,2,0,1),(8,1,1,1,2,1,5),(9,1,1,2,2,1,5),(10,1,1,3,2,1,5),(11,1,1,4,2,1,5),(12,1,1,5,2,1,5),(13,1,2,0,7,0,2),(14,1,2,1,7,1,5),(15,1,2,2,7,1,5),(16,1,2,3,7,1,5),(17,1,2,4,7,1,5),(18,1,2,5,7,1,5),(19,1,2,0,8,0,2),(20,1,2,1,8,1,6),(21,1,2,2,8,1,6),(22,1,2,3,8,1,6),(23,1,2,4,8,1,6),(24,1,2,5,8,1,6),(25,1,3,0,15,0,2),(26,1,3,1,15,2,7),(27,1,3,2,15,2,7),(28,1,3,3,15,2,7),(29,1,3,4,15,2,7),(30,1,3,5,15,2,7),(31,1,3,0,14,0,2),(32,1,3,1,14,1,8),(33,1,3,2,14,1,8),(34,1,3,3,14,1,8),(35,1,3,4,14,1,8),(36,1,3,5,14,1,8),(37,1,4,0,20,0,9),(38,1,4,1,20,1,12),(39,1,4,2,20,1,12),(40,1,4,3,20,1,12),(41,1,4,4,20,1,12),(42,1,4,5,20,1,12),(43,1,4,0,21,0,9),(44,1,4,1,21,1,13),(45,1,4,2,21,1,13),(46,1,4,3,21,1,13),(47,1,4,4,21,1,13),(48,1,4,5,21,1,13),(49,1,5,0,22,0,10),(50,1,5,1,22,1,13),(51,1,5,2,22,1,13),(52,1,5,3,22,1,13),(53,1,5,4,22,1,13),(54,1,5,5,22,1,13),(55,1,5,0,23,0,10),(56,1,5,1,23,1,14),(57,1,5,2,23,1,14),(58,1,5,3,23,1,14),(59,1,5,4,23,1,14),(60,1,5,5,23,1,14),(61,1,6,0,25,0,11),(62,1,6,1,25,2,15),(63,1,6,2,25,2,15),(64,1,6,3,25,2,15),(65,1,6,4,25,2,15),(66,1,6,5,25,2,15),(67,1,6,0,24,0,11),(68,1,6,1,24,1,16),(69,1,6,2,24,1,16),(70,1,6,3,24,1,16),(71,1,6,4,24,1,16),(72,1,6,5,24,1,16);
/*!40000 ALTER TABLE `course_offered` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `course_offered_faculty`
--

LOCK TABLES `course_offered_faculty` WRITE;
/*!40000 ALTER TABLE `course_offered_faculty` DISABLE KEYS */;
INSERT INTO `course_offered_faculty` VALUES (1,5),(2,2),(3,2),(4,2),(5,2),(6,2),(7,2),(8,3),(9,3),(10,3),(11,3),(12,3),(13,3),(14,4),(15,4),(16,4),(17,4),(18,4),(19,3),(20,5),(21,5),(22,5),(23,5),(24,5),(25,5),(26,4),(27,2),(28,2),(29,2),(30,2),(31,2),(32,5),(33,4),(34,3),(35,4),(36,5),(37,9),(38,6),(39,6),(40,6),(41,6),(42,6),(43,6),(44,7),(45,7),(46,7),(47,7),(48,7),(49,7),(50,8),(51,8),(52,8),(53,8),(54,8),(55,7),(56,9),(57,9),(58,9),(59,9),(60,9),(61,9),(62,8),(63,6),(64,6),(65,6),(66,6),(67,6),(68,9),(69,8),(70,7),(71,8),(72,9);
/*!40000 ALTER TABLE `course_offered_faculty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'Civil Engineering','CE',1),(3,'Computer Engineering','CP',1),(6,'Mechanical Engineering','ME',1),(9,'Information Technology','IT',1);
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `designation`
--

LOCK TABLES `designation` WRITE;
/*!40000 ALTER TABLE `designation` DISABLE KEYS */;
INSERT INTO `designation` VALUES (3,'Head of Department',8,1),(4,'Professor',14,1),(5,'Assistant Professor',18,1),(6,'Lecturer',20,1);
/*!40000 ALTER TABLE `designation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `faculty`
--

LOCK TABLES `faculty` WRITE;
/*!40000 ALTER TABLE `faculty` DISABLE KEYS */;
INSERT INTO `faculty` VALUES (1,NULL,'Darshak G. Thakore','D.G.T','T130',3,3),(2,NULL,'Bhavesh A. Tanawala','B.A.T','T223',5,3),(3,NULL,'Mosin I. Hasan','M.I.H','T230',5,3),(4,NULL,'Kirti J. Sharma','K.J.S','T153',5,3),(5,NULL,'Narendra M. Patel','N.M.P','T123',4,3),(6,NULL,'IT Faculty - 1','IT-1','T500',5,9),(7,NULL,'IT Faculty - 2','IT-2','T501',5,9),(8,NULL,'IT Faculty - 3','IT-3','T502',5,9),(9,NULL,'IT Faculty - 4','IT-4','T503',4,9);
/*!40000 ALTER TABLE `faculty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `group`
--

LOCK TABLES `group` WRITE;
/*!40000 ALTER TABLE `group` DISABLE KEYS */;
/*!40000 ALTER TABLE `group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `history_course_offered`
--

LOCK TABLES `history_course_offered` WRITE;
/*!40000 ALTER TABLE `history_course_offered` DISABLE KEYS */;
/*!40000 ALTER TABLE `history_course_offered` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `history_course_offered_faculty`
--

LOCK TABLES `history_course_offered_faculty` WRITE;
/*!40000 ALTER TABLE `history_course_offered_faculty` DISABLE KEYS */;
/*!40000 ALTER TABLE `history_course_offered_faculty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `history_time_table`
--

LOCK TABLES `history_time_table` WRITE;
/*!40000 ALTER TABLE `history_time_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `history_time_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `institute`
--

LOCK TABLES `institute` WRITE;
/*!40000 ALTER TABLE `institute` DISABLE KEYS */;
INSERT INTO `institute` VALUES (1,'Birla Vishwakarma Mahavidyalaya, Vallabh Vidynagar','BVM');
/*!40000 ALTER TABLE `institute` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (1,'A218',NULL,70,0),(2,'A219',NULL,65,0),(3,'A220',NULL,70,0),(4,'LAB-8',NULL,22,1),(5,'LAB-7A',NULL,20,1),(6,'LAB-7B',NULL,20,1),(7,'LAB-6',NULL,20,1),(8,'LAB-5',NULL,20,1),(9,'B-308',NULL,65,0),(10,'B-309',NULL,65,0),(11,'B-310',NULL,70,0),(12,'LAB-1',NULL,22,1),(13,'LAB-2',NULL,20,1),(14,'LAB-3',NULL,20,1),(15,'LAB-4A',NULL,20,1),(16,'LAB-4B',NULL,20,1);
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_user_table',1),(2,'2014_10_12_100000_create_password_resets_table',1),(3,'2018_01_06_141641_create_institute_table',1),(4,'2018_01_06_141652_create_location_table',1),(5,'2018_01_06_141702_create_programme_table',1),(6,'2018_01_06_141710_create_group_table',1),(7,'2018_01_06_141721_create_department_table',1),(8,'2018_01_06_141731_create_profile_table',1),(9,'2018_01_06_141743_create_designation_table',1),(10,'2018_01_06_141756_create_course_table',1),(11,'2018_01_06_141808_create_class_table',1),(12,'2018_01_06_141851_create_course_offered_table',1),(13,'2018_01_06_141902_create_faculty_table',1),(14,'2018_01_06_141914_create_time_table_table',1),(15,'2018_01_06_141928_create_course_offered_faculty_table',1),(16,'2018_01_06_141944_create_history_course_offered_table',1),(17,'2018_01_06_141956_create_history_course_offered_faculty_table',1),(18,'2018_01_06_142012_create_history_time_table_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
INSERT INTO `profile` VALUES (1,'BE-Winter-2018','Bachelor of Engineering, Winter, 2018',2018,1,'2018-01-08 09:58:22',0,1);
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `programme`
--

LOCK TABLES `programme` WRITE;
/*!40000 ALTER TABLE `programme` DISABLE KEYS */;
INSERT INTO `programme` VALUES (1,'Bachelor of Engineering','BE',4,1);
/*!40000 ALTER TABLE `programme` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `time_table`
--

LOCK TABLES `time_table` WRITE;
/*!40000 ALTER TABLE `time_table` DISABLE KEYS */;
INSERT INTO `time_table` VALUES (1,1,11,12,'MON',1),(2,1,11,12,'TUE',1),(3,1,11,12,'WED',1),(4,1,11,12,'THU',1),(5,1,12,14,'MON',2),(6,1,13,15,'TUE',3),(7,1,14,16,'WED',4),(8,1,16,18,'THU',5),(9,1,11,13,'FRI',6),(10,1,14,16,'MON',7),(11,1,12,13,'TUE',7),(12,1,16,18,'MON',8),(13,1,16,18,'TUE',9),(14,1,16,18,'WED',10),(15,1,12,14,'THU',11),(16,1,12,14,'WED',12),(17,1,11,12,'MON',13),(18,1,11,12,'TUE',13),(19,1,11,12,'WED',13),(20,1,11,12,'THU',13),(21,1,12,14,'MON',14),(22,1,13,15,'TUE',15),(23,1,14,16,'WED',16),(24,1,16,18,'THU',17),(25,1,11,13,'FRI',18),(26,1,14,15,'MON',19),(27,1,12,13,'TUE',19),(28,1,16,18,'MON',20),(29,1,16,18,'TUE',21),(30,1,16,18,'WED',22),(31,1,12,14,'THU',23),(32,1,12,14,'WED',24),(33,1,12,13,'MON',25),(34,1,13,14,'TUE',25),(35,1,11,13,'TUE',26),(36,1,14,18,'MON',27),(37,1,13,15,'FRI',28),(38,1,14,16,'THU',29),(39,1,16,18,'FRI',30),(40,1,11,12,'MON',31),(41,1,11,12,'WED',31),(42,1,11,12,'THU',31),(43,1,11,12,'FRI',31),(44,1,13,14,'MON',32),(45,1,12,13,'FRI',33),(46,1,12,13,'THU',34),(47,1,17,18,'THU',35),(48,1,14,15,'TUE',36),(49,1,11,12,'MON',37),(50,1,11,12,'TUE',37),(51,1,11,12,'WED',37),(52,1,11,12,'THU',37),(53,1,12,14,'MON',38),(54,1,13,15,'TUE',39),(55,1,14,16,'WED',40),(56,1,16,18,'THU',41),(57,1,11,13,'FRI',42),(58,1,14,16,'MON',43),(59,1,12,13,'TUE',43),(60,1,16,18,'MON',44),(61,1,16,18,'TUE',45),(62,1,16,18,'WED',46),(63,1,12,14,'THU',47),(64,1,12,14,'WED',48),(65,1,11,12,'MON',49),(66,1,11,12,'TUE',49),(67,1,11,12,'WED',49),(68,1,11,12,'THU',49),(69,1,12,14,'MON',50),(70,1,13,15,'TUE',51),(71,1,14,16,'WED',52),(72,1,16,18,'THU',53),(73,1,11,13,'FRI',54),(74,1,14,15,'MON',55),(75,1,12,13,'TUE',55),(76,1,16,18,'MON',56),(77,1,16,18,'TUE',57),(78,1,16,18,'WED',58),(79,1,12,14,'THU',59),(80,1,12,14,'WED',60),(81,1,12,13,'MON',61),(82,1,13,14,'TUE',61),(83,1,11,13,'TUE',62),(84,1,14,18,'MON',63),(85,1,13,15,'FRI',64),(86,1,14,16,'THU',65),(87,1,16,18,'FRI',66),(88,1,11,12,'MON',67),(89,1,11,12,'WED',67),(90,1,11,12,'THU',67),(91,1,11,12,'FRI',67),(92,1,13,14,'MON',68),(93,1,12,13,'FRI',69),(94,1,12,13,'THU',70),(95,1,17,18,'THU',71),(96,1,14,15,'TUE',72);
/*!40000 ALTER TABLE `time_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-08 18:06:20
