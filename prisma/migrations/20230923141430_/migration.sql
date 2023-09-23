/*
  Warnings:

  - You are about to drop the column `person_id_representative` on the `organizations` table. All the data in the column will be lost.
  - Added the required column `id_person_representative` to the `organizations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `organizations` DROP FOREIGN KEY `organizations_person_id_representative_fkey`;

-- AlterTable
ALTER TABLE `organizations` DROP COLUMN `person_id_representative`,
    ADD COLUMN `id_person_representative` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `organizations` ADD CONSTRAINT `organizations_id_person_representative_fkey` FOREIGN KEY (`id_person_representative`) REFERENCES `people`(`id_imobzi`) ON DELETE CASCADE ON UPDATE CASCADE;
