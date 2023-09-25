/*
  Warnings:

  - You are about to drop the column `annual_readjustment` on the `leases` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `leases` DROP COLUMN `annual_readjustment`,
    ADD COLUMN `id_annual_readjustment_imobzi` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `ReadjustmentIndex` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_index_readjustment_imobzi` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
