-- MySQL dump 10.13  Distrib 5.7.17, for Linux (x86_64)
--
-- Host: 192.168.0.98    Database: billing
-- ------------------------------------------------------
-- Server version	5.5.5-10.0.31-MariaDB-0ubuntu0.16.04.2

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
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `companies` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `ip_address` varchar(15) DEFAULT NULL,
  `port` int(5) DEFAULT '22',
  `company_name` varchar(45) DEFAULT NULL,
  `payed` tinyint(4) DEFAULT '0',
  `hostname` varchar(64) DEFAULT NULL,
  `tls_key` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES (14,'178.20.154.244',5556,'Navion LTD',0,'navion.com.ua','navion'),(17,'178.20.154.244',5557,'Agrotec',0,'navion.com.ua','agrotec'),(19,'178.94.173.189',5555,'metinvest',0,'ohholding.com.ua','metinvest'),(20,'178.94.173.189',5555,'ohholding',0,'ohholding.com.ua','ohholding'),(21,'178.20.154.244',5558,'demo-контейнер',1,'navion.com.ua','demo');
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies_archive`
--

DROP TABLE IF EXISTS `companies_archive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `companies_archive` (
  `id` int(11) unsigned NOT NULL,
  `ip_address` varchar(15) DEFAULT NULL,
  `port` int(5) DEFAULT '22',
  `company_name` varchar(45) DEFAULT NULL,
  `payed` tinyint(4) DEFAULT '0',
  `hostname` varchar(64) DEFAULT NULL,
  `tls_key` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies_archive`
--

LOCK TABLES `companies_archive` WRITE;
/*!40000 ALTER TABLE `companies_archive` DISABLE KEYS */;
INSERT INTO `companies_archive` VALUES (13,'178.20.154.244',5555,'Тест-контейнер',1,'navion.com.ua','testing'),(18,'178.94.173.189',5555,'loe',0,'ohholding.com.ua','loe'),(23,'asdfddd',333,'asdfddd',1,'aasdfddd','asdfddd'),(24,'asdf',3333,'ffffffff',1,'asdf','asdf'),(25,'45345345',345345,'erg55g',0,'435345','345345'),(26,'ewrewr',23,'ewfewrfe',0,'re32','3r');
/*!40000 ALTER TABLE `companies_archive` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deploy`
--

DROP TABLE IF EXISTS `deploy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `deploy` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `referenceBranch` varchar(90) NOT NULL,
  `creationTime` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deploy`
--

LOCK TABLES `deploy` WRITE;
/*!40000 ALTER TABLE `deploy` DISABLE KEYS */;
INSERT INTO `deploy` VALUES (32,'deploy_KarenTask','KarenTask',1506605037),(33,'deploy_KarenTask','KarenTask',1506608378),(34,'deploy_KarenTask','KarenTask',1506609472),(35,'deploy_KarenTask','KarenTask',1506675268),(36,'deploy_KarenTask','KarenTask',1506675411),(37,'deploy_KarenTask','KarenTask',1506676508),(38,'deploy_KarenTask','KarenTask',1506676717),(39,'deploy_KarenTask','KarenTask',1506678728),(40,'deploy_KarenTask','KarenTask',1506678819),(41,'deploy_KarenTask','KarenTask',1506679063),(42,'deploy_KarenTask','KarenTask',1506679097),(43,'deploy_KarenTask','KarenTask',1506679234),(44,'deploy_KarenTask','KarenTask',1506679774),(45,'deploy_KarenTask','KarenTask',1506682993),(46,'deploy_KarenTask','KarenTask',1506687925),(47,'deploy_KarenTask','KarenTask',1506694962),(48,'deploy_KarenTask','KarenTask',1507023618),(49,'deploy_KarenTask','KarenTask',1507030177),(50,'deploy_KarenTask','KarenTask',1507030383),(51,'deploy_KarenTask','KarenTask',1507034025),(52,'deploy_KarenTask','KarenTask',1507034432),(53,'deploy_KarenTask','KarenTask',1507036415),(54,'deploy_KarenTask','KarenTask',1507036520),(55,'deploy_KarenTask','KarenTask',1507037374),(56,'deploy_KarenTask','KarenTask',1507037623),(57,'deploy_KarenTask','KarenTask',1507038582),(58,'deploy_KarenTask','KarenTask',1507128713),(59,'deploy_denver_flags','denver_flags',1507198594);
/*!40000 ALTER TABLE `deploy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `log`
--

DROP TABLE IF EXISTS `log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `log` (
  `id` int(11) NOT NULL,
  `update_time` int(11) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `version` varchar(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log`
--

LOCK TABLES `log` WRITE;
/*!40000 ALTER TABLE `log` DISABLE KEYS */;
/*!40000 ALTER TABLE `log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testing_containers`
--

DROP TABLE IF EXISTS `testing_containers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `testing_containers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `ip_address` varchar(15) NOT NULL,
  `port` int(5) NOT NULL DEFAULT '22',
  `hostname` varchar(64) DEFAULT NULL,
  `tls_key` varchar(15) DEFAULT NULL,
  `active` tinyint(1) unsigned DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testing_containers`
--

LOCK TABLES `testing_containers` WRITE;
/*!40000 ALTER TABLE `testing_containers` DISABLE KEYS */;
INSERT INTO `testing_containers` VALUES (1,'Навион','178.20.154.244',5555,'navion.com.ua','testing',1);
/*!40000 ALTER TABLE `testing_containers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `versions`
--

DROP TABLE IF EXISTS `versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `versions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sql` text,
  `commit` varchar(42) NOT NULL,
  `unixTime` int(10) unsigned NOT NULL,
  `note` tinytext,
  `major` tinyint(3) unsigned NOT NULL,
  `minor` tinyint(3) unsigned NOT NULL,
  `build` tinyint(3) unsigned NOT NULL,
  `revision` tinyint(3) unsigned NOT NULL,
  `relise` varchar(3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `versions`
--

LOCK TABLES `versions` WRITE;
/*!40000 ALTER TABLE `versions` DISABLE KEYS */;
INSERT INTO `versions` VALUES (1,NULL,'9d6e90d7a3cd8e07cbfdcff6d3f695296837c545',1505174400,NULL,0,0,0,0,NULL),(2,NULL,'2bc94463cfa637463655eebc26a2fb3a05e07c8c',1505177400,NULL,0,0,0,0,NULL),(3,NULL,'68567ee593b93012b39e16883a1f42d36430bdb9',1505483299,NULL,0,0,0,0,NULL);
/*!40000 ALTER TABLE `versions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-10-05 14:05:48
