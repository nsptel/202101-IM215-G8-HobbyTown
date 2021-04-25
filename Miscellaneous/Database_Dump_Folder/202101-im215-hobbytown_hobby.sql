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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

<<<<<<< HEAD
-- Dump completed on 2021-04-14  1:39:20
=======
-- Dump completed on 2021-04-24 23:09:22
>>>>>>> Milestone-C
