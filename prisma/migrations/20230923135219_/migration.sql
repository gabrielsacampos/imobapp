/*
  Warnings:

  - You are about to drop the column `lease_id` on the `lease_items` table. All the data in the column will be lost.
  - Added the required column `id_lease_imobzi` to the `lease_items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `lease_items` DROP FOREIGN KEY `lease_items_lease_id_fkey`;

-- AlterTable
ALTER TABLE `lease_items` DROP COLUMN `lease_id`,
    ADD COLUMN `id_lease_imobzi` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `lease_items` ADD CONSTRAINT `lease_items_id_lease_imobzi_fkey` FOREIGN KEY (`id_lease_imobzi`) REFERENCES `leases`(`id_imobzi`) ON DELETE CASCADE ON UPDATE CASCADE;
