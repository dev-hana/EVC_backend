-- MySQL dump 10.13  Distrib 5.7.33, for Linux (x86_64)
--
-- Host: localhost    Database: web
-- ------------------------------------------------------
-- Server version	5.7.33

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
-- Table structure for table `chargeTp`
--

DROP TABLE IF EXISTS `chargeTp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chargeTp` (
  `type` int(11) NOT NULL,
  `name` varchar(8) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`type`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chargeTp`
--

LOCK TABLES `chargeTp` WRITE;
/*!40000 ALTER TABLE `chargeTp` DISABLE KEYS */;
INSERT INTO `chargeTp` VALUES (2,'급속'),(1,'완속');
/*!40000 ALTER TABLE `chargeTp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cpStat`
--

DROP TABLE IF EXISTS `cpStat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cpStat` (
  `type` int(11) NOT NULL,
  `name` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`type`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cpStat`
--

LOCK TABLES `cpStat` WRITE;
/*!40000 ALTER TABLE `cpStat` DISABLE KEYS */;
INSERT INTO `cpStat` VALUES (3,'고장/점검'),(1,'충전가능'),(2,'충전중'),(5,'통신미연결'),(4,'통신장애');
/*!40000 ALTER TABLE `cpStat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cpTp`
--

DROP TABLE IF EXISTS `cpTp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cpTp` (
  `type` int(11) NOT NULL,
  `name` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`type`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cpTp`
--

LOCK TABLES `cpTp` WRITE;
/*!40000 ALTER TABLE `cpTp` DISABLE KEYS */;
INSERT INTO `cpTp` VALUES (6,'AC3상'),(3,'BC타입(5핀)'),(4,'BC타입(7핀)'),(1,'B타입(5핀)'),(2,'C타입(5핀)'),(5,'DC차데모'),(9,'DC차데모+AC3상'),(8,'DC차데모+DC콤보'),(10,'DC차데모+DC콤보+AC3상'),(7,'DC콤보');
/*!40000 ALTER TABLE `cpTp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ev_info`
--

DROP TABLE IF EXISTS `ev_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ev_info` (
  `csId` int(11) DEFAULT NULL,
  `name` mediumtext COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `member` (
  `pri_id` int(11) NOT NULL AUTO_INCREMENT,
  `id` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` char(11) COLLATE utf8mb4_unicode_ci NOT NULL,
  `signup_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `withdrawal` timestamp NULL DEFAULT NULL,
  `salt` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`pri_id`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `review` (
  `mem_id` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `csId` int(11) NOT NULL,
  `star` float DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `content` mediumtext COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`mem_id`,`csId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

-- Dump completed on 2021-06-29  2:29:07
