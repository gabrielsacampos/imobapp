/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `buildings` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `buildings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `buildings` ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `buildings_name_key` ON `buildings`(`name`);
