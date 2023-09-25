/*
  Warnings:

  - You are about to drop the column `reference` on the `invoices` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `invoices` DROP COLUMN `reference`,
    ADD COLUMN `reference_end_at` VARCHAR(191) NULL,
    ADD COLUMN `reference_start_at` VARCHAR(191) NULL;
