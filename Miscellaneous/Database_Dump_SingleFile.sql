<<<<<<< HEAD
CREATE DATABASE  IF NOT EXISTS `202101-im215-hobbytown` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `202101-im215-hobbytown`;
-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: 202101-im215-hobbytown
-- ------------------------------------------------------
-- Server version	8.0.19
=======
-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: 202101-im215-hobbytown
-- ------------------------------------------------------
-- Server version	8.0.23
>>>>>>> Milestone-C

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` longtext NOT NULL,
  `timestamp` timestamp(2) NOT NULL DEFAULT CURRENT_TIMESTAMP(2),
  `event_date` datetime(2) NOT NULL,
  `group_id` int NOT NULL,
<<<<<<< HEAD
  PRIMARY KEY (`id`),
  KEY `group_id_idx` (`group_id`),
  CONSTRAINT `group_id` FOREIGN KEY (`group_id`) REFERENCES `group` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
=======
  `image` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `group_id_idx` (`group_id`),
  CONSTRAINT `group_id` FOREIGN KEY (`group_id`) REFERENCES `group` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
>>>>>>> Milestone-C
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
<<<<<<< HEAD
=======
INSERT INTO `event` VALUES (8,'First one','This is an event','2021-04-25 02:14:06.47','2021-06-05 18:30:00.00',12,'/event_pics/sample_event.png');
>>>>>>> Milestone-C
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group`
--

DROP TABLE IF EXISTS `group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `creator` int NOT NULL,
  `description` longtext,
  `image` varchar(100) DEFAULT NULL,
  `timestamp` timestamp(2) NOT NULL DEFAULT CURRENT_TIMESTAMP(2),
  PRIMARY KEY (`id`),
  KEY `creator` (`creator`),
  CONSTRAINT `group_ibfk_1` FOREIGN KEY (`creator`) REFERENCES `user` (`id`) ON DELETE CASCADE
<<<<<<< HEAD
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
=======
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
>>>>>>> Milestone-C
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group`
--

LOCK TABLES `group` WRITE;
/*!40000 ALTER TABLE `group` DISABLE KEYS */;
<<<<<<< HEAD
=======
INSERT INTO `group` VALUES (12,'something',24,'This is a group','/group_pics/sample_group.png','2021-04-25 02:13:31.11');
>>>>>>> Milestone-C
/*!40000 ALTER TABLE `group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hobby`
--

DROP TABLE IF EXISTS `hobby`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hobby` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
<<<<<<< HEAD
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
=======
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;
>>>>>>> Milestone-C
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hobby`
--

LOCK TABLES `hobby` WRITE;
/*!40000 ALTER TABLE `hobby` DISABLE KEYS */;
<<<<<<< HEAD
INSERT INTO `hobby` VALUES (10,'Basketball'),(6,'Bowling'),(7,'Boxing'),(28,'cricket'),(8,'Cycling'),(9,'Golf'),(2,'Ice Hockey'),(29,'Kabaddi'),(4,'Lawn-Tennis'),(13,'Skiing'),(11,'Soccer'),(3,'Table-Tennis'),(12,'Volleyball'),(27,'y'),(5,'Yoga');
=======
INSERT INTO `hobby` VALUES (36,'Arts'),(10,'Basketball'),(6,'Bowling'),(7,'Boxing'),(37,'Craft'),(33,'cricket'),(8,'Cycling'),(34,'football'),(9,'Golf'),(2,'Ice Hockey'),(4,'Lawn-Tennis'),(35,'Ludo'),(13,'Skiing'),(11,'Soccer'),(3,'Table-Tennis'),(12,'Volleyball'),(5,'Yoga');
>>>>>>> Milestone-C
/*!40000 ALTER TABLE `hobby` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `email` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `timestamp` timestamp(2) NOT NULL DEFAULT CURRENT_TIMESTAMP(2),
  `profile_pic` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`) /*!80000 INVISIBLE */,
  UNIQUE KEY `username` (`username`)
<<<<<<< HEAD
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
=======
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;
>>>>>>> Milestone-C
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
<<<<<<< HEAD
INSERT INTO `user` VALUES (2,'Chintan','Trivedi','chintan024@gmail.com','chintan24','Qwerty1@','2021-04-12 05:21:23.16','/profile_pics/2.jpg'),(5,'chintan','trivedi','chintant777@gmail.com','chintan247','Qwerty1@','2021-04-07 04:25:43.31','/profile_pics/5.jpg'),(6,'Neel','Patel','nsp4898@gmail.com','nil48','Qwerty1@','2021-04-07 03:47:35.50','/profile_pics/sample_profile.png'),(11,'John','Doe','john@doe.som','JohnDoe','Qwerty1@','2021-04-07 04:36:08.49','/profile_pics/sample_profile.png'),(12,'Abc','Def','abc@def.ghi','abcde','Qwerty1@','2021-04-07 04:42:12.63','/profile_pics/12.jpg');
=======
INSERT INTO `user` VALUES (23,'Nilkumar S','Patel','nilkumarpatel48@gmail.com','NilkumarPatel48','Neel@4898','2021-04-25 02:16:37.97','/profile_pics/sample_profile.png'),(24,'Neel','Patel','nsp4898@gmail.com','2316Nil','Neel@4898','2021-04-25 02:16:23.88','/profile_pics/24.jpg'),(25,'Chintan','Trivedi','chintan024@gmail.com','Chintan_247','Chintan024@','2021-04-06 23:47:44.97','/profile_pics/sample_profile.png'),(29,'Chaitali','Rahol','chaitalirahol3@gmail.com','Chaitalirh','Neel@4898','2021-04-06 23:20:17.26','/profile_pics/sample_profile.png');
>>>>>>> Milestone-C
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_group`
--

DROP TABLE IF EXISTS `user_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_group` (
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`group_id`),
  KEY `group_id` (`group_id`),
  CONSTRAINT `user_group_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `user_group_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_group`
--

LOCK TABLES `user_group` WRITE;
/*!40000 ALTER TABLE `user_group` DISABLE KEYS */;
<<<<<<< HEAD
=======
INSERT INTO `user_group` VALUES (23,12);
>>>>>>> Milestone-C
/*!40000 ALTER TABLE `user_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_hobby`
--

DROP TABLE IF EXISTS `user_hobby`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_hobby` (
  `user_id` int NOT NULL,
  `hobby_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`hobby_id`),
  KEY `hobby_id` (`hobby_id`),
  CONSTRAINT `user_hobby_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `user_hobby_ibfk_2` FOREIGN KEY (`hobby_id`) REFERENCES `hobby` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_hobby`
--

LOCK TABLES `user_hobby` WRITE;
/*!40000 ALTER TABLE `user_hobby` DISABLE KEYS */;
<<<<<<< HEAD
INSERT INTO `user_hobby` VALUES (2,2),(5,2),(6,2),(11,2),(12,2),(2,3),(6,3),(6,10),(6,28),(11,29);
=======
INSERT INTO `user_hobby` VALUES (23,2),(24,2),(23,3),(24,9),(23,10),(24,33),(25,35),(29,36);
>>>>>>> Milestone-C
/*!40000 ALTER TABLE `user_hobby` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

<<<<<<< HEAD
-- Dump completed on 2021-04-14  1:33:09
=======
-- Dump completed on 2021-04-24 23:07:06
>>>>>>> Milestone-C
