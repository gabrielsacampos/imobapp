/*
  Warnings:

  - A unique constraint covering the columns `[id_imobzi]` on the table `properties` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_imobzi` to the `properties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `properties` ADD COLUMN `id_imobzi` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `properties_id_imobzi_key` ON `properties`(`id_imobzi`);
