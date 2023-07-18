CREATE SCHEMA `my-full-stack` DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_general_ci;

use `my-full-stack`;

DROP TABLE IF EXISTS `cms_user`;
CREATE TABLE `cms_user` (
  `id` varchar(39) NOT NULL COMMENT '主键ID',
  `email` varchar(50) NOT NULL COMMENT '用户登录账号，是一个邮箱',
  `username` varchar(50) NOT NULL DEFAULT '' COMMENT '用户名',
  `pwd` varchar(64) NOT NULL COMMENT '用户登录密码',
  `isEnable` enum('0','1') NOT NULL COMMENT '有效状态 0 无效 1有效',
  `createTime` bigint NOT NULL COMMENT '创建时间',
  `updateTime` bigint NOT NULL COMMENT '更新时间',
  `lastLoginTime` bigint NOT NULL COMMENT '最后登陆时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB COMMENT='cms用户账号密码信息';

LOCK TABLES `cms_user` WRITE;
INSERT INTO `cms_user` VALUES ('b81df358-cbd5-4217-a466-8228bf2224da','jiale.chan@gmail.com','家乐','6ca13d52ca70c883e0f0bb101e425a89e8624de51db2d2392593af6a84118090','1',1687674133000,1687674133000,1687674133000);
UNLOCK TABLES;
