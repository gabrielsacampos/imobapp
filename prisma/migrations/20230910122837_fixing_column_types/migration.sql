/*
  Warnings:

  - The primary key for the `owners` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `owners` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `owners` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `share` DECIMAL(65, 30) NOT NULL,
    ADD PRIMARY KEY (`id`);
