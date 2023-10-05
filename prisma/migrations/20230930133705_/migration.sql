/*
  Warnings:

  - You are about to drop the column `autopay_on_due_date` on the `lease_items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `lease_items` DROP COLUMN `autopay_on_due_date`;
