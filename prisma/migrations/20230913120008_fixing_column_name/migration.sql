/*
  Warnings:

  - You are about to drop the column `decription` on the `lease_items` table. All the data in the column will be lost.
  - Added the required column `description` to the `lease_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `lease_items` DROP COLUMN `decription`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL;
