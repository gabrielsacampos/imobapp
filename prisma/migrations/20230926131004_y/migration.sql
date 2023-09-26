/*
  Warnings:

  - Added the required column `idtest` to the `invoices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `invoices` ADD COLUMN `idtest` VARCHAR(191) NOT NULL;
