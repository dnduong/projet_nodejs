-- MySQL dump 10.13  Distrib 5.7.25, for Linux (x86_64)
--
-- Host: localhost    Database: DM_web
-- ------------------------------------------------------
-- Server version	5.7.25-0ubuntu0.16.04.2

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
-- Table structure for table `alpha1_images`
--

DROP TABLE IF EXISTS `alpha1_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `alpha1_images` (
  `images` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alpha1_images`
--

LOCK TABLES `alpha1_images` WRITE;
/*!40000 ALTER TABLE `alpha1_images` DISABLE KEYS */;
INSERT INTO `alpha1_images` VALUES ('th(8).jpg');
/*!40000 ALTER TABLE `alpha1_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bravo1_images`
--

DROP TABLE IF EXISTS `bravo1_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bravo1_images` (
  `images` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bravo1_images`
--

LOCK TABLES `bravo1_images` WRITE;
/*!40000 ALTER TABLE `bravo1_images` DISABLE KEYS */;
INSERT INTO `bravo1_images` VALUES ('th(5).jpg'),('th(1).jpg');
/*!40000 ALTER TABLE `bravo1_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `duong1_images`
--

DROP TABLE IF EXISTS `duong1_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `duong1_images` (
  `images` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `duong1_images`
--

LOCK TABLES `duong1_images` WRITE;
/*!40000 ALTER TABLE `duong1_images` DISABLE KEYS */;
INSERT INTO `duong1_images` VALUES ('th(6).jpg');
/*!40000 ALTER TABLE `duong1_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `duong2_images`
--

DROP TABLE IF EXISTS `duong2_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `duong2_images` (
  `images` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `duong2_images`
--

LOCK TABLES `duong2_images` WRITE;
/*!40000 ALTER TABLE `duong2_images` DISABLE KEYS */;
INSERT INTO `duong2_images` VALUES ('th(3).jpg');
/*!40000 ALTER TABLE `duong2_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `duong_images`
--

DROP TABLE IF EXISTS `duong_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `duong_images` (
  `images` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `duong_images`
--

LOCK TABLES `duong_images` WRITE;
/*!40000 ALTER TABLE `duong_images` DISABLE KEYS */;
INSERT INTO `duong_images` VALUES ('36918932_2088690044676877_7222835115724898304_n.jpg'),('th.jpg'),('th(12).jpg');
/*!40000 ALTER TABLE `duong_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relationships`
--

DROP TABLE IF EXISTS `relationships`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `relationships` (
  `like_first` varchar(255) DEFAULT NULL,
  `like_after` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relationships`
--

LOCK TABLES `relationships` WRITE;
/*!40000 ALTER TABLE `relationships` DISABLE KEYS */;
INSERT INTO `relationships` VALUES ('duong','duong','1_side'),('duong','duong1','matched'),('bravo1','duong','matched'),('bravo1','duong1','matched'),('duong2','duong','matched'),('alpha1','duong','matched'),('duong2','duong1','1_side'),('duong2','bravo1','matched'),('alpha1','duong1','1_side'),('alpha1','bravo1','1_side');
/*!40000 ALTER TABLE `relationships` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `nom` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `sexe` varchar(10) DEFAULT NULL,
  `login` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `text` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('duong','duc nguyen','h','duong','7c4a8d09ca3762af61e59520943dc26494f8941b','th(12).jpg',NULL),('duong','duc nguyen','f','duong1','7c4a8d09ca3762af61e59520943dc26494f8941b','th(7).jpg','Tom and Jerry, i love animation'),('duong','duc nguyen','f','bravo1','7c4a8d09ca3762af61e59520943dc26494f8941b','defaut.jpg',NULL),('duong','duc nguyen','h','duong2','7c4a8d09ca3762af61e59520943dc26494f8941b','th(2).jpg','I love eating !!'),('duong','duc nguyen','f','alpha1','7c4a8d09ca3762af61e59520943dc26494f8941b','th(4).jpg',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-03-17 19:05:50
