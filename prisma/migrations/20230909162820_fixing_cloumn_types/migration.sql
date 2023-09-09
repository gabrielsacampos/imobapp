/*
  Warnings:

  - You are about to alter the column `bedroom` on the `properties` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `suite` on the `properties` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `garage` on the `properties` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `properties` MODIFY `area` DECIMAL(65, 30) NULL,
    MODIFY `bedroom` INTEGER NULL,
    MODIFY `suite` INTEGER NULL,
    MODIFY `garage` INTEGER NULL;
