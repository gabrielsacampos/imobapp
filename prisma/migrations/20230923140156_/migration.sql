/*
  Warnings:

  - You are about to drop the column `building_id` on the `properties` table. All the data in the column will be lost.
  - Added the required column `id_building_imobzi` to the `properties` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `properties` DROP FOREIGN KEY `properties_building_id_fkey`;

-- AlterTable
ALTER TABLE `properties` DROP COLUMN `building_id`,
    ADD COLUMN `id_building_imobzi` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `properties` ADD CONSTRAINT `properties_id_building_imobzi_fkey` FOREIGN KEY (`id_building_imobzi`) REFERENCES `buildings`(`id_imobzi`) ON DELETE CASCADE ON UPDATE CASCADE;
