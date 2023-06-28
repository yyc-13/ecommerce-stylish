-- MySQL dump 10.13  Distrib 8.0.26, for macos11 (arm64)
--
-- Host: localhost    Database: products
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id_images` int NOT NULL AUTO_INCREMENT,
  `images_route` varchar(250) DEFAULT NULL,
  `productsid` int DEFAULT NULL,
  PRIMARY KEY (`id_images`),
  KEY `fk_productsid` (`productsid`),
  CONSTRAINT `fk_productsid` FOREIGN KEY (`productsid`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,'public/images/1630899740859--800x.jpeg,public/images/1630899740864--800x (2).jpg',1),(2,'public/images/1630899875635--800x (4).jpg,public/images/1630899875638--800x (5).jpg',2),(3,'public/images/1630899985431--00442369-03.jpg,public/images/1630899985434--00442369-04.jpeg',3),(4,'public/images/1630900054753--00443355-014.jpeg,public/images/1630900054754--00443355-015.jpeg',4),(5,'public/images/1630900127189--00443730-043.jpeg,public/images/1630900127191--00443730-045.jpeg',5),(6,'public/images/1630900235980--00443780-02.jpeg,public/images/1630900235981--00443780-022.jpeg,public/images/1630900235982--00443780-0224.jpeg',6),(7,'public/images/1630900288246--00444492-012.jpeg,public/images/1630900288247--00444492-0123.jpeg',7),(8,'public/images/1630900367948--00445948-023.jpeg',8),(9,'public/images/1630900436249--00446486-02.jpeg,public/images/1630900436251--00446486-012.jpeg',9),(10,'public/images/1630900562419--00442605-023.jpeg,public/images/1630900562421--00442605-0256.jpeg',10);
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT NULL,
  `description` varchar(150) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `texture` varchar(50) DEFAULT NULL,
  `wash` varchar(50) DEFAULT NULL,
  `place` varchar(50) DEFAULT NULL,
  `note` varchar(150) DEFAULT NULL,
  `story` varchar(150) DEFAULT NULL,
  `main_image` varchar(250) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'東尼衣服','好穿實用',1280,'合成纖維','水洗','中國','無','Say hello du ma lil frend','public/images/1630899740849--800x (1).jpg','men'),(2,'水藍襯衫','好穿襯衫',1280,'棉','水洗','中國','無','白雲朵朵','public/images/1630899875632--800x (3).jpg','men'),(3,'米色大衣','輕便舒適',1280,'棉','手洗','米國','無','無','public/images/1630899985427--00442369-03 (1).jpg','women'),(4,'長靴','好穿',1280,'pe','不可洗','中國','無','無','public/images/1630900054752--00443355-01.jpeg','women'),(5,'牛仔外套','防風防水',1280,'牛仔','乾洗','美國','無','無','public/images/1630900127188--00443730-04.jpeg','women'),(6,'拼色外套','防風防雨',1280,'燈芯絨','乾洗','美國','無','無','public/images/1630900235979--00443780-02.jpeg','women'),(7,'白色上衣','white t',666,'cotton','normal','泰國','無','無','public/images/1630900288239--00444492-01.jpeg','women'),(8,'格紋喇叭褲','耐穿實用',990,'彈性纖維','正常 ','越南','無','無','public/images/1630900367945--00445948-02.jpeg','women'),(9,'開襟上衣','無',680,'cotton','normal','US','無','無','public/images/1630900436248--00446486-01.jpeg','women'),(10,'麂皮皮包','萬用',1399,'麂皮','不可洗','日本','無','無','public/images/1630900562419--00442605-02.jpeg','accessories');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `variants`
--

DROP TABLE IF EXISTS `variants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `variants` (
  `id_variant` int NOT NULL AUTO_INCREMENT,
  `color_code` varchar(45) DEFAULT NULL,
  `size` varchar(45) DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `productsid` int DEFAULT NULL,
  PRIMARY KEY (`id_variant`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `variants`
--

LOCK TABLES `variants` WRITE;
/*!40000 ALTER TABLE `variants` DISABLE KEYS */;
INSERT INTO `variants` VALUES (1,'#000000','M',12,'Black',1),(2,'#07AFA2','L',12,'Niagara',2),(3,'#FFE5C5','M',12,'Tequila',3),(4,'#000000','L',7,'Black',4),(5,'#6F6F6F','M',12,'Dove Gray',5),(6,'#FB7B2F','XL',12,'Crusta',6),(7,'#FFFFFF','M',12,'White',7),(8,'#C70039','M',12,'Monza',8),(9,'#FFFFFF','S',5,'White',9),(10,'#D37842','L',8,'Raw Sienna',10);
/*!40000 ALTER TABLE `variants` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-06 17:48:36
