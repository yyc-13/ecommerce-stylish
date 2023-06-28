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
-- Table structure for table `campaign_products`
--

DROP TABLE IF EXISTS `campaign_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign_products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(500) DEFAULT NULL,
  `campaign_text` varchar(1000) DEFAULT NULL,
  `image_path` varchar(1000) DEFAULT NULL,
  `products_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_products_id` (`products_id`),
  CONSTRAINT `fk_products_id` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campaign_products`
--

LOCK TABLES `campaign_products` WRITE;
/*!40000 ALTER TABLE `campaign_products` DISABLE KEYS */;
INSERT INTO `campaign_products` VALUES (16,'藍色洋裝','人們說的天空藍，那是我記憶中的白雲，最美的藍天','public/images/waldo.jpeg',NULL),(17,'紅色襯衫','他是一場無論如何都該談一場的戀愛','public/images/girl.jpeg',NULL),(18,'米色大衣','米勞熟','public/images/NaQvWExl.jpeg',NULL),(19,'123','123','public/images/waldo.jpeg',NULL),(20,'123','123','public/images/waldo.jpeg',NULL),(21,'123','123','public/images/NaQvWExl.jpeg',NULL);
/*!40000 ALTER TABLE `campaign_products` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (38,'public/images/1631649444471--0.jpeg,public/images/1631649444474--1 (1).jpeg',28),(41,'public/images/1631650257109--0.jpeg,public/images/1631650257110--1 (1).jpeg',30),(42,'public/images/1631650534473--0.jpeg,public/images/1631650534474--1 (1).jpeg',31),(44,'public/images/1631650863195--0.jpeg,public/images/1631650863196--1 (1).jpeg',33),(45,'public/images/1631650908107--0.jpeg,public/images/1631650908109--1 (1).jpeg',35),(46,'public/images/1631651257606--1 (1).jpeg,public/images/1631651257610--0.jpeg',36),(48,'public/images/1631651558988--0.jpeg,public/images/1631651558995--1 (1).jpeg',38);
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
  `story` varchar(1000) DEFAULT NULL,
  `main_image` varchar(250) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (28,'前開衩扭結洋裝','厚薄：薄 彈性：無',799,'棉 100%','清洗：手洗，溫水','產地：中國','實品顏色依單品照為主','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.','public/images/1631649444465--main.jpeg','women'),(30,'透肌澎澎防曬襯衫','厚薄：薄 彈性：無',599,'棉 100%','清洗：手洗，溫水','產地：中國','實品顏色依單品照為主','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.','public/images/1631650043411--main.jpeg','women'),(31,'小扇紋細織上衣','厚薄：薄 彈性：無',599,'棉 100%','清洗：手洗，溫水','產地：中國','實品顏色依單品照為主','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.','public/images/1631650257106--main.jpeg','women'),(33,'活力花紋長筒牛仔褲','厚薄：薄 彈性：無',1299,'棉 100%','清洗：手洗，溫水','產地：中國','實品顏色依單品照為主','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.','public/images/1631650591429--main.jpeg','women'),(35,'純色輕薄百搭襯衫','厚薄：薄 彈性：無',799,'棉 100%','清洗：手洗，溫水','產地：中國','實品顏色依單品照為主','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.','public/images/1631650908106--main.jpeg','men'),(36,'時尚輕鬆休閒西裝','厚薄：薄 彈性：無',2399,'棉 100%','清洗：手洗，溫水','產地：中國','實品顏色依單品照為主','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.','public/images/1631651257600--main.jpeg','men'),(38,'夏日海灘戶外遮陽帽','厚薄：薄 彈性：無',1499,'棉 100%','清洗：手洗，溫水','產地：中國','實品顏色依單品照為主','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.','public/images/1631651558985--main.jpeg','accessories');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_information`
--

DROP TABLE IF EXISTS `user_information`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_information` (
  `name` varchar(200) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_information`
--

LOCK TABLES `user_information` WRITE;
/*!40000 ALTER TABLE `user_information` DISABLE KEYS */;
INSERT INTO `user_information` VALUES ('mac','mac@gmail.com','a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3',9),('mac','yang@gmail.com','a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3',10),('mac','chen@gmail.com','a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3',11),('hello','hello@gmail.com','2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824',12),('hello','hello3@gmail.com','2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824',13),('123','123','a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3',14),('楊岳哲','yangyueche@gmail.com','null',15),('徐逸誠','fish1233333@gmail.com','null',16),('123','123@gmail.com','58ccc265b4cd6c4083d83a69cfa80058f33fc54d5101d2c6e0c222ee211c5adc',17);
/*!40000 ALTER TABLE `user_information` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_orders`
--

DROP TABLE IF EXISTS `user_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_orders` (
  `iduser_orders` int NOT NULL AUTO_INCREMENT,
  `payment_status` varchar(45) DEFAULT NULL,
  `prime` varchar(100) DEFAULT NULL,
  `shipping` varchar(100) DEFAULT NULL,
  `payment` varchar(100) DEFAULT NULL,
  `subtotal` int DEFAULT NULL,
  `freight` int DEFAULT NULL,
  `total` int DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `phone` int DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `time` varchar(45) DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  `product_name` varchar(45) DEFAULT NULL,
  `product_price` int DEFAULT NULL,
  `product_color_code` varchar(45) DEFAULT NULL,
  `product_color_name` varchar(45) DEFAULT NULL,
  `size` varchar(45) DEFAULT NULL,
  `qty` int DEFAULT NULL,
  PRIMARY KEY (`iduser_orders`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_orders`
--

LOCK TABLES `user_orders` WRITE;
/*!40000 ALTER TABLE `user_orders` DISABLE KEYS */;
INSERT INTO `user_orders` VALUES (1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(6,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(7,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(8,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(9,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(11,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(12,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(13,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(14,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(15,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(16,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(17,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(18,'paid','e3b5ce6b035d5852daa8a4c228a003714b56ee4fd5c663af0d15056e8fdadcca','delivery','credit_card',1234,14,1300,'Luke',987654321,'luke@gmail.com','市政府站','morning',201807202157,'活力花紋長筒牛仔褲',NULL,'DDF0FF','淺藍','M',1),(19,'unpaid','e3b5ce6b035d5852daa8a4c228a003714b56ee4fd5c663af0d15056e8fdadcca','delivery','credit_card',1234,14,1300,'Luke',987654321,'luke@gmail.com','市政府站','morning',201807202157,'活力花紋長筒牛仔褲',NULL,'DDF0FF','淺藍','M',1),(20,'unpaid','e3b5ce6b035d5852daa8a4c228a003714b56ee4fd5c663af0d15056e8fdadcca','delivery','credit_card',1234,14,1300,'Luke',987654321,'luke@gmail.com','市政府站','morning',201807202157,'活力花紋長筒牛仔褲',1299,'DDF0FF','淺藍','M',1),(21,'unpaid','e3b5ce6b035d5852daa8a4c228a003714b56ee4fd5c663af0d15056e8fdadcca','delivery','credit_card',1234,14,1300,'Luke',987654321,'luke@gmail.com','市政府站','morning',201807202157,'活力花紋長筒牛仔褲',1299,'DDF0FF','淺藍','M',1),(22,'unpaid','0f0e72662c30d432329ec1e7fdfa7aa958acaf8bfaff6dffba3c04e0bf05bc38','delivery','credit_card',1234,14,1300,'Luke',987654321,'luke@gmail.com','市政府站','morning',201807202157,'活力花紋長筒牛仔褲',1299,'DDF0FF','淺藍','M',1),(23,'paid','53677b5098f7cbb7e168e34389042ffbf22aeea07e09f73c783d20ea7802a50f','delivery','credit_card',1234,14,1300,'Luke',987654321,'luke@gmail.com','市政府站','morning',201807202157,'活力花紋長筒牛仔褲',1299,'DDF0FF','淺藍','M',1),(24,'paid','9cd31ac4a9312c255234af60c5fbd3f94b318838346a767b5468bf7ad203b034','delivery','credit_card',1234,14,1300,'Luke',987654321,'luke@gmail.com','市政府站','morning',201807202157,'活力花紋長筒牛仔褲',1299,'DDF0FF','淺藍','M',1),(25,'paid','07160424a1b4abfda32cdbe015a994b5546280f7c7bd6f1c5d4e827cdc12d074','delivery','credit_card',1234,14,1300,'Luke',987654321,'luke@gmail.com','市政府站','morning',201807202157,'活力花紋長筒牛仔褲',1299,'DDF0FF','淺藍','M',1),(26,'paid','16bf96d1dcaa4925d6701d15fcdb11661472e291437494b4d21b36909abac0ee','delivery','credit_card',1234,14,1300,'Luke',987654321,'luke@gmail.com','市政府站','morning',201807202157,'活力花紋長筒牛仔褲',1299,'DDF0FF','淺藍','M',1),(27,'paid','347fea9aa6d4f43aed7e613253f4b0fb347cdf3d9ef72887898be43f321b8465','delivery','credit_card',1234,14,1300,'Luke',987654321,'luke@gmail.com','市政府站','morning',201807202157,'活力花紋長筒牛仔褲',1299,'DDF0FF','淺藍','M',1),(28,'paid','012fdb46c82d7eab74e3810dc6e14adb6eb6e35fd37395a54019a155feb63354','delivery','credit_card',1234,14,1300,'Luke',987654321,'luke@gmail.com','市政府站','morning',201807202157,'活力花紋長筒牛仔褲',1299,'DDF0FF','淺藍','M',1),(29,'paid','525785a87d92029a67702fa3fa5a3de8470f28ee83d1d224fa87e54d34909b1d','delivery','credit_card',1234,14,1300,'Luke',987654321,'luke@gmail.com','市政府站','morning',201807202157,'活力花紋長筒牛仔褲',1299,'DDF0FF','淺藍','M',1),(30,'paid','6b012a0951d45be5787bcec95bdc1c8e4da3afc5afec38ab0bf5cf1fb57f34fd','delivery','credit_card',1234,14,1300,'Luke',987654321,'luke@gmail.com','市政府站','morning',201807202157,'活力花紋長筒牛仔褲',1299,'DDF0FF','淺藍','M',1),(31,'paid','88309c9a83a7b254941dfb626f91fa366b5391f630310761bc34d11dd1ae8f59','delivery','credit_card',1234,14,1300,'Luke',987654321,'luke@gmail.com','市政府站','morning',201807202157,'活力花紋長筒牛仔褲',1299,'DDF0FF','淺藍','M',1),(32,'paid','a529572a08ed099a9a5b12067ef4d428abc6c6e18191f592a64a258677e39d38','delivery','credit_card',1234,14,1300,'Luke',987654321,'luke@gmail.com','市政府站','morning',201807202157,'活力花紋長筒牛仔褲',1299,'DDF0FF','淺藍','M',1),(33,'paid','9a90af0912bdcac200166de9154976096c6f4c67ad848dd471b20fc5737a7bf9','delivery','credit_card',1234,14,1300,'Luke',987654321,'luke@gmail.com','市政府站','morning',201807202157,'活力花紋長筒牛仔褲',1299,'DDF0FF','淺藍','M',1),(34,'paid','5a6b93e228cb900999f0c89f889e16f71650dbfbac213a4b3473610d7ccbb986','delivery','credit_card',1234,14,1300,'Luke',987654321,'luke@gmail.com','市政府站','morning',201807202157,'活力花紋長筒牛仔褲',1299,'DDF0FF','淺藍','M',1),(35,'paid','ee1d10d6fbd98cf683eeeb8a0805b3cc2ebde5d8219b38f31a012b602bf39b32','delivery','credit_card',1234,14,1300,'Luke',987654321,'luke@gmail.com','市政府站','morning',201807202157,'活力花紋長筒牛仔褲',1299,'DDF0FF','淺藍','M',1),(36,'paid','a4b256e66b2b7aa9c3a2d204a819e30974643ac836fabd19e94fe36fbafee647','delivery','credit_card',1234,14,1300,'Luke',987654321,'luke@gmail.com','市政府站','morning',201807202157,'活力花紋長筒牛仔褲',1299,'DDF0FF','淺藍','M',1),(37,'paid','99bb18eb0c4b30eefbae4ba9ebfc71c7d50904b4daf915c219a0785c567789ac','delivery','credit_card',1234,14,1300,'Luke',987654321,'luke@gmail.com','市政府站','morning',201807202157,'活力花紋長筒牛仔褲',1299,'DDF0FF','淺藍','M',1),(38,'paid','2e666178433bcff9d47110e9d61d54e2fa20fd180ddcb7a2c7443b23de49b10c','delivery','credit_card',1234,14,1300,'Luke',987654321,'luke@gmail.com','市政府站','morning',201807202157,'活力花紋長筒牛仔褲',1299,'DDF0FF','淺藍','M',1),(39,'paid','d0c8cada874e41dd2a15ecb0021c54c92004ed0e4d59c39e6d3caef6ead8b8f6','delivery','credit_card',1234,14,1300,'Luke',987654321,'luke@gmail.com','市政府站','morning',201807202157,'活力花紋長筒牛仔褲',1299,'DDF0FF','淺藍','M',1),(40,'paid','899efbba26262075e8bd40a349af3f17a3b379f0b2fb6b9c1364a82dc33b0d6a','delivery','credit_card',1234,14,1300,'Luke',987654321,'luke@gmail.com','市政府站','morning',201807202157,'活力花紋長筒牛仔褲',1299,'DDF0FF','淺藍','M',1),(41,'paid','97a889d6f6142889edf9d4fc992a37716c17b6d00a8e309db7361e39bf1cf308','delivery','credit_card',1234,14,1300,'Luke',987654321,'luke@gmail.com','市政府站','morning',201807202157,'活力花紋長筒牛仔褲',1299,'DDF0FF','淺藍','M',1),(42,'paid','b79079296725ab61aa01220e58d3823481bfad96789626a3cbf409593cb7aae1','delivery','credit_card',1234,14,1300,'Luke',987654321,'luke@gmail.com','市政府站','morning',201807202157,'活力花紋長筒牛仔褲',1299,'DDF0FF','淺藍','M',1);
/*!40000 ALTER TABLE `user_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `variants`
--

DROP TABLE IF EXISTS `variants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `variants` (
  `id_variant` int NOT NULL AUTO_INCREMENT,
  `colorCode` varchar(45) DEFAULT NULL,
  `size` varchar(45) DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `productsid` int DEFAULT NULL,
  PRIMARY KEY (`id_variant`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `variants`
--

LOCK TABLES `variants` WRITE;
/*!40000 ALTER TABLE `variants` DISABLE KEYS */;
INSERT INTO `variants` VALUES (21,'#FFFFFF','S',2,'White',28),(22,'#FFFFFF','M',1,'White',28),(23,'#FFFFFF','L',2,'White',28),(24,'#6CCB13 ','S',9,'Green',28),(25,'#6CCB13 ','L',5,'Green',28),(26,'#808080','S',8,'Gray',28),(27,'#808080','M',5,'Gray',28),(28,'#808080','L',9,'Gray',28),(29,'#00FF00','S',7,'Green',30),(30,'#00FF00','M',5,'Green',30),(31,'#00FF00','L',8,'Green',30),(32,'#808080','S',1,'Gray',30),(33,'#808080','M',6,'Gray',30),(34,'#808080','L',2,'Gray',30),(36,'#00FF00','S',3,'Green',31),(37,'#00FF00','M',5,'Green',31),(38,'#808080','S',4,'Gray',31),(39,'#808080','M',1,'Gray',31),(40,'#964B00','S',2,'Brown',31),(41,'#964B00','M',6,'Brown',31),(43,'#00FF00','S',7,'Blue',33),(44,'#00FF00','M',5,'Blue',33),(45,'#00FF00','L',6,'Blue',33),(46,'#808080','S',0,'Gray',33),(47,'#808080','M',6,'Gray',33),(48,'#808080','L',5,'Gray',33),(49,'#00008b','S',2,'Dark Blue',33),(50,'#00008b','M',3,'Dark Blue',33),(51,'#00008b','L',4,'Dark Blue',33),(53,'#FFFFFF','S',7,'White',35),(54,'#FFFFFF','L',4,'White',35),(55,'#FFFFFF','XL',5,'White',35),(56,'#00FF00','M',3,'Blue',35),(57,'#00FF00','L',4,'Blue',35),(58,'#00FF00','XL',5,'Blue',35),(60,'#FFFFFF','S',7,'White',36),(61,'#FFFFFF','M',2,'White',36),(62,'#FFFFFF','L',3,'White',36),(63,'#808080','S',2,'Gray',36),(64,'#808080','M',2,'Gray',36),(65,'#808080','L',3,'Gray',36),(66,'#00FF00','M',7,'Blue',38),(67,'#00FF00','L',3,'Blue',38),(68,'#964B00','M',3,'Brown',38),(69,'#964B00','L',2,'Brown',38);
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

-- Dump completed on 2021-09-15  6:05:29
