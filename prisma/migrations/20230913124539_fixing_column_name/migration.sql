/*
  Warnings:

  - You are about to drop the column `management_feee` on the `invoices_items` table. All the data in the column will be lost.
  - Added the required column `management_fee` to the `invoices_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `invoices_items` DROP COLUMN `management_feee`,
    ADD COLUMN `management_fee` BOOLEAN NOT NULL;
