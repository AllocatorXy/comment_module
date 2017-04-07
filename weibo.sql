/*
Navicat MySQL Data Transfer

Source Server         : develop
Source Server Version : 50528
Source Host           : localhost:3306
Source Database       : weibo

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2017-03-23 14:24:54
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `ID` int(15) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  `time` int(12) NOT NULL,
  `acc` int(20) NOT NULL DEFAULT '0',
  `ref` int(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES ('47', 'ssss', '1489463372', '0', '0');
INSERT INTO `comment` VALUES ('48', 'sff', '1489463393', '2', '0');
INSERT INTO `comment` VALUES ('49', '1', '1489463397', '1', '0');
INSERT INTO `comment` VALUES ('76', 'asfasf', '1489472310', '0', '0');
INSERT INTO `comment` VALUES ('78', 'asfasf', '1489472590', '1', '1');
INSERT INTO `comment` VALUES ('79', 'asfasfasf', '1489472592', '3', '2');
INSERT INTO `comment` VALUES ('80', 'qwfqwf', '1489472593', '4', '2');
INSERT INTO `comment` VALUES ('86', '暗示法萨芬', '1489475852', '4', '2');
