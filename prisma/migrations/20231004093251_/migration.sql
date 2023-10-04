/*
  Warnings:

  - You are about to drop the column `until_due_date` on the `invoices` table. All the data in the column will be lost.
  - Added the required column `until_due_date` to the `invoices_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `invoices` DROP COLUMN `until_due_date`;

-- AlterTable
ALTER TABLE `invoices_items` ADD COLUMN `until_due_date` BOOLEAN NOT NULL;
