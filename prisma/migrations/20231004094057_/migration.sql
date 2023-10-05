/*
  Warnings:

  - Added the required column `due_date` to the `invoices_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `invoices_items` ADD COLUMN `due_date` VARCHAR(191) NOT NULL;
