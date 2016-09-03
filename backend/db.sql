-- MySQL dump 10.16  Distrib 10.1.14-MariaDB, for Linux (i686)
--
-- Host: localhost    Database: dankotuwa
-- ------------------------------------------------------
-- Server version	10.1.14-MariaDB

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
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `CategoryID` bigint(30) NOT NULL AUTO_INCREMENT,
  `CategoryName` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`CategoryID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Blue rose'),(2,'Livy'),(3,'Lasting rose');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dealer`
--

DROP TABLE IF EXISTS `dealer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dealer` (
  `DealerID` bigint(30) NOT NULL AUTO_INCREMENT,
  `Name` varchar(30) DEFAULT NULL,
  `Geo_lat` varchar(9) DEFAULT NULL,
  `Geo_lng` varchar(9) DEFAULT NULL,
  PRIMARY KEY (`DealerID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dealer`
--

LOCK TABLES `dealer` WRITE;
/*!40000 ALTER TABLE `dealer` DISABLE KEYS */;
INSERT INTO `dealer` VALUES
(1,'MR. MARSUK','6.936697','79.8508339'),
(2,'MR.RANJAN','7.0928812','79.994663'),
(3,'MR. NISSANKA','6.8729147','79.8914526'),
(4,'MS.PRIYADARSHANI','6.706874','79.9085884'),
(5,'MR.ANANDAN','7.0661319','80.5984317'),
(6,'MR.PRIYADARSHANA','6.9540221','80.2107389'),
(7,'MR.KAPILA','7.9306474','81.032735'),
(8,'MR. SUNIL','6.94153285','79.8540366228431'),
(9,'MR. AMEER','6.9393273','79.8525151'),
(10,'MR.HASHIM','6.9393273','79.8525151'),
(11,'MR.PERERA','7.0028965','79.9550933'),
(12,'MR.MICHAEL','7.0478181','79.896959'),
(13,'MR.RAMYASIRI','6.8465001','79.9276204'),
(14,'MR.NANDASIRI','6.8433037','80.0034918'),
(15,'MR.RIZWAN/ MR. MOBARAK','6.6803691','80.4022975'),
(16,'MRS.LINIKA','6.8018439','79.9227034'),
(17,'MR. CHANDIKA','6.3340647','80.8538325'),
(18,'MR.BANDARA','6.8694343','79.8894412'),
(19,'MR.BAGASRAWALA','6.9898202','81.0569425'),
(20,'MR.WIJESURIYA','6.8306703','80.9894924'),
(21,'MR.JAYANTHA','6.9738157','80.7670673'),
(22,'MR.JANITH','7.2944808','80.635635'),
(23,'MR. MOHAN','7.2944808','80.635635'),
(24,'MR. PATHIRANA','7.2909946','81.6756629'),
(25,'MR.WIJESURIYA','6.2353731','80.0543611'),
(26,'MR. SHAMIEEN','5.9461235','80.5527437'),
(27,'MR.A.W.A.NIFFAR','7.2090206','79.8404418'),
(28,'MR.U.B. WEERAKOON','6.975632','79.9247203'),
(29,'MR. JUDE FERNANDO','7.4642259','79.8274594'),
(30,'MR.V.KUMARASINGHA','7.8774361','80.0109326'),
(31,'MR. JANAKA','6.3340647','80.8538325'),
(32,'NO NAME','8.7558362','80.5005386'),
(33,'MR.SILVA','6.906808','80.9204461'),
(34,'NO.84,BANK SIDE,','8.3354139','80.4080552'),
(35,'MR.THASLIM','8.0408145','80.5971595'),
(36,'MR. LALITH','6.1118528','81.0518284976946'),
(37,'MR.PIYARATHNA','7.33618005','80.3002929652516'),
(38,'MR.HUSALEEN','7.3668465','80.1488431'),
(39,'MR. A. ATHUKORALA','7.2532249','80.3461307'),
(40,'MR. DANASIRI','7.4621612','80.0790652'),
(41,'MR.ROHAN RANASINGHA','6.9341161','79.84478'),
(42,'MR. CHANDIMAL','5.9450134','80.5425121'),
(43,'MR.DHARMASIRI','6.0346306','80.2122467'),
(44,'MR.KUMARA - (K MART KADUWELLA)','6.9367085','79.9838148'),
(45,'MR.LIYANAGE.','6.5959174','80.4575962'),
(46,'MR.ARUMUGAN','7.2274041','79.8512158'),
(47,'MS.HETTIARACHCHI','6.8720197','79.8618219'),
(48,'MRS. SAKUNTHALA','6.8975578','79.8519591'),
(49,'NO NAME','6.8649414','79.8843627'),
(50,'MR. KARUNARATHNA','7.9294123','80.2927174'),
(51,'MR.ROY','6.9885664','81.0662546'),
(52,'MR. ASHLY TUDER JAYASINGHE.','7.4879684','80.3626066'),
(53,'W.M.GUNASEKERA','6.8436971','80.8983797'),
(54,'NO NAME','6.8783592','79.8581413'),
(55,'MR.LUXMAN PREARATHNA','7.6198111','80.2461477'),
(56,'M.M.P.SUSIL FERNANDO','7.3788846','79.8292257'),
(57,'MR.H.R.DE SILVA','6.9465986','80.2127463'),
(58,'MR.STANLEY SIRIMANNA','6.8744332','79.8591763'),
(59,'M.M.M.MILFER','6.9018582','79.8526949'),
(60,'SHIRAMA K. AMARASEKARA','6.868847','79.8849143'),
(61,'MR.M.S.M.MANEER','7.1260389','80.0684667'),
(62,'MR.A.MOHANRAJ','6.8767556','79.8584347'),
(63,'MS. M.J.TIDAKSHI LAKMINI','7.093794','79.8854743'),
(64,'UPALE PREMATHILAKA','7.3200776','79.9643881'),
(65,'J.M.NIHAL','7.1117076','80.0496289'),
(66,'MR.UPUL','6.8941972','80.5936432'),
(67,'MR.LALITH PERERA','6.8751257','79.899238'),
(68,'MR.DADLEY DE SILVA','6.7929603','79.8763518'),
(69,'NO NAME','6.8854817','79.854017'),
(70,'MR. T.D.C. PUSHPAKUMARA','6.9609608','79.9935794'),
(71,'MS. SRIMATHI','6.8772464','79.9899292'),
(72,'MR.R.B.M. WIJESINGHE','6.6479256','80.7014023'),
(73,'NO NAME','6.6235845','80.5430483'),
(74,'MS.DARMALATHA','6.9207123','79.8699143'),
(75,'L.A.K. DE SILVA','6.9035915','79.8498787');
/*!40000 ALTER TABLE `dealer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dealer_rep_order`
--

DROP TABLE IF EXISTS `dealer_rep_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dealer_rep_order` (
  `EmployeeID` bigint(30) NOT NULL,
  `OrderNumber` bigint(30) NOT NULL,
  `DealerID` bigint(30) NOT NULL,
  `Correct_location` int(1) DEFAULT NULL,
  PRIMARY KEY (`EmployeeID`,`OrderNumber`,`DealerID`),
  KEY `fk_oID` (`OrderNumber`),
  KEY `fk_dealer` (`DealerID`),
  CONSTRAINT `fk_dealer` FOREIGN KEY (`DealerID`) REFERENCES `dealer` (`DealerID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_emp` FOREIGN KEY (`EmployeeID`) REFERENCES `sales_representative` (`EmployeeID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_oID` FOREIGN KEY (`OrderNumber`) REFERENCES `order_info` (`OrderNumber`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dealer_rep_order`
--

LOCK TABLES `dealer_rep_order` WRITE;
/*!40000 ALTER TABLE `dealer_rep_order` DISABLE KEYS */;
INSERT INTO `dealer_rep_order` VALUES (1,1,1,1),(1,3,1,1),(2,2,2,0),(2,29,1,1),(3,30,1,1);
/*!40000 ALTER TABLE `dealer_rep_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_info`
--

DROP TABLE IF EXISTS `order_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_info` (
  `OrderNumber` bigint(30) NOT NULL AUTO_INCREMENT,
  `Epoch` bigint(10) DEFAULT NULL,
  `sign` string(500),
  PRIMARY KEY (`OrderNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_info`
--

LOCK TABLES `order_info` WRITE;
/*!40000 ALTER TABLE `order_info` DISABLE KEYS */;
INSERT INTO `order_info` VALUES (1,1471341682),(2,1471341100),(3,1471341699),(29,1471451040),(30,1471939714);
/*!40000 ALTER TABLE `order_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_product`
--

DROP TABLE IF EXISTS `order_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_product` (
  `OrderNumber` bigint(30) NOT NULL,
  `ProductID` bigint(30) NOT NULL,
  `CategoryID` bigint(30) NOT NULL,
  `Quantity` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`OrderNumber`,`ProductID`,`CategoryID`),
  KEY `fk_product` (`ProductID`),
  KEY `fk_category` (`CategoryID`),
  CONSTRAINT `fk_category` FOREIGN KEY (`CategoryID`) REFERENCES `category` (`CategoryID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_product` FOREIGN KEY (`ProductID`) REFERENCES `product` (`ProductID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_product`
--

LOCK TABLES `order_product` WRITE;
/*!40000 ALTER TABLE `order_product` DISABLE KEYS */;
INSERT INTO `order_product` VALUES (1,1,3,2),(1,2,2,2),(2,1,1,3),(2,2,1,3),(2,3,3,3),(3,2,1,1),(3,3,3,1),(29,2,2,4),(29,2,3,3),(30,1,1,2),(30,2,2,1);
/*!40000 ALTER TABLE `order_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `ProductID` bigint(30) NOT NULL AUTO_INCREMENT,
  `ProductName` varchar(30) DEFAULT NULL,
  `Price` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`ProductID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Dinner plate','10'),(2,'Salad plate','15'),(3,'Cereak bowl','15');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales_representative`
--

DROP TABLE IF EXISTS `sales_representative`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sales_representative` (
  `EmployeeID` bigint(30) NOT NULL AUTO_INCREMENT,
  `Name` varchar(30) DEFAULT NULL,
  `UserName` varchar(30) DEFAULT NULL,
  `Email` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`EmployeeID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales_representative`
--

LOCK TABLES `sales_representative` WRITE;
/*!40000 ALTER TABLE `sales_representative` DISABLE KEYS */;
INSERT INTO `sales_representative` VALUES (1,'Udara Nanayakkara','udara','udara@dankotuwa.com'),(2,'Anuradha Perera','anup','anup@dankotuwa.com'),(3,'Malith Senaweera','malithsen','malithsenaweera@gmail.com');
/*!40000 ALTER TABLE `sales_representative` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-08-23 21:27:30
