/*
  Warnings:

  - Added the required column `unity` to the `properties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `properties` ADD COLUMN `unity` VARCHAR(191) NOT NULL;
