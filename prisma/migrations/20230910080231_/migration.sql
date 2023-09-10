/*
  Warnings:

  - You are about to drop the column `unity` on the `properties` table. All the data in the column will be lost.
  - Added the required column `unit` to the `properties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `properties` DROP COLUMN `unity`,
    ADD COLUMN `unit` VARCHAR(191) NOT NULL;
