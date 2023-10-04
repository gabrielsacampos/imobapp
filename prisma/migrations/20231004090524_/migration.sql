/*
  Warnings:

  - Added the required column `until_due_date` to the `invoices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `invoices` ADD COLUMN `until_due_date` BOOLEAN NOT NULL;
