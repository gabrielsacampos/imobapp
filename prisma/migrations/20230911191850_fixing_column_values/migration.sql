/*
  Warnings:

  - You are about to alter the column `repeat_total` on the `lease_items` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `repeat_index` on the `lease_items` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `lease_items` MODIFY `repeat_total` INTEGER NULL,
    MODIFY `repeat_index` INTEGER NOT NULL;
