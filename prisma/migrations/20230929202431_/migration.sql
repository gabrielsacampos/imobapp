/*
  Warnings:

  - You are about to alter the column `birthdate` on the `people` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - Made the column `representative_type` on table `organizations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `organizations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `organizations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cpf` on table `people` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `people` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `people` required. This step will fail if there are existing NULL values in that column.
  - Made the column `id_building_imobzi` on table `properties` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `properties` DROP FOREIGN KEY `properties_id_building_imobzi_fkey`;

-- AlterTable
ALTER TABLE `organizations` MODIFY `representative_type` VARCHAR(191) NOT NULL,
    MODIFY `phone` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `people` MODIFY `cpf` VARCHAR(255) NOT NULL,
    MODIFY `fullname` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(255) NOT NULL,
    MODIFY `phone` VARCHAR(255) NOT NULL,
    MODIFY `birthdate` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `properties` MODIFY `id_building_imobzi` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `properties` ADD CONSTRAINT `properties_id_building_imobzi_fkey` FOREIGN KEY (`id_building_imobzi`) REFERENCES `buildings`(`id_imobzi`) ON DELETE CASCADE ON UPDATE CASCADE;
