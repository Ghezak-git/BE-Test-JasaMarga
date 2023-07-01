/*
 Navicat Premium Data Transfer

 Source Server         : localpostgree
 Source Server Type    : PostgreSQL
 Source Server Version : 150001 (150001)
 Source Host           : localhost:5432
 Source Catalog        : jasa_marga
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 150001 (150001)
 File Encoding         : 65001

 Date: 01/07/2023 19:15:00
*/


-- ----------------------------
-- Sequence structure for ruas_coordinates_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."ruas_coordinates_id_seq";
CREATE SEQUENCE "public"."ruas_coordinates_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for ruas_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."ruas_id_seq";
CREATE SEQUENCE "public"."ruas_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for user_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."user_id_seq";
CREATE SEQUENCE "public"."user_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Table structure for ruas
-- ----------------------------
DROP TABLE IF EXISTS "public"."ruas";
CREATE TABLE "public"."ruas" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "ruas" varchar(255) COLLATE "pg_catalog"."default",
  "km_awal" varchar(255) COLLATE "pg_catalog"."default",
  "km_akhir" varchar(255) COLLATE "pg_catalog"."default",
  "status" bool,
  "created_by" varchar(255) COLLATE "pg_catalog"."default",
  "updated_by" varchar(255) COLLATE "pg_catalog"."default",
  "created_at" timestamp(6) DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(6) DEFAULT CURRENT_TIMESTAMP
)
;

-- ----------------------------
-- Records of ruas
-- ----------------------------

-- ----------------------------
-- Table structure for ruas_coordinates
-- ----------------------------
DROP TABLE IF EXISTS "public"."ruas_coordinates";
CREATE TABLE "public"."ruas_coordinates" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "ruas_id" int4,
  "coordinates" varchar(255) COLLATE "pg_catalog"."default",
  "created_by" varchar(255) COLLATE "pg_catalog"."default",
  "updated_by" varchar(255) COLLATE "pg_catalog"."default",
  "created_at" timestamp(6) DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(6) DEFAULT CURRENT_TIMESTAMP
)
;

-- ----------------------------
-- Records of ruas_coordinates
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS "public"."user";
CREATE TABLE "public"."user" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "fullname" varchar(255) COLLATE "pg_catalog"."default",
  "username" varchar(255) COLLATE "pg_catalog"."default",
  "password" varchar(255) COLLATE "pg_catalog"."default",
  "last_logon" timestamp(6),
  "refresh_token" text COLLATE "pg_catalog"."default",
  "created_by" varchar(255) COLLATE "pg_catalog"."default",
  "updated_by" varchar(255) COLLATE "pg_catalog"."default",
  "created_at" timestamp(6) DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(6) DEFAULT CURRENT_TIMESTAMP
)
;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO "public"."user" OVERRIDING SYSTEM VALUE VALUES (1, 'Muhammad Ghezak', 'ghz12', '$2b$10$rB62VmMXSIXV3f/e992sdu/K3lLmJFGAwVgHiac2dAI3e5uxvumTW', NULL, NULL, 'System', 'System', '2023-07-01 12:13:32.275989', '2023-07-01 12:13:32.275989');

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."ruas_coordinates_id_seq"
OWNED BY "public"."ruas_coordinates"."id";
SELECT setval('"public"."ruas_coordinates_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."ruas_id_seq"
OWNED BY "public"."ruas"."id";
SELECT setval('"public"."ruas_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."user_id_seq"
OWNED BY "public"."user"."id";
SELECT setval('"public"."user_id_seq"', 1, true);

-- ----------------------------
-- Auto increment value for ruas
-- ----------------------------
SELECT setval('"public"."ruas_id_seq"', 1, false);

-- ----------------------------
-- Primary Key structure for table ruas
-- ----------------------------
ALTER TABLE "public"."ruas" ADD CONSTRAINT "ruas_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Auto increment value for ruas_coordinates
-- ----------------------------
SELECT setval('"public"."ruas_coordinates_id_seq"', 1, false);

-- ----------------------------
-- Primary Key structure for table ruas_coordinates
-- ----------------------------
ALTER TABLE "public"."ruas_coordinates" ADD CONSTRAINT "ruas_coordinates_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Auto increment value for user
-- ----------------------------
SELECT setval('"public"."user_id_seq"', 1, true);

-- ----------------------------
-- Primary Key structure for table user
-- ----------------------------
ALTER TABLE "public"."user" ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");
