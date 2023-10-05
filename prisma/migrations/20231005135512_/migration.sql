/*
  Warnings:

  - Added the required column `property_block` to the `properties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `properties` ADD COLUMN `property_block` VARCHAR(191) NOT NULL DEFAULT '';

