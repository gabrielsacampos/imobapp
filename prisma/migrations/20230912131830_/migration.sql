/*
  Warnings:

  - You are about to alter the column `children` on the `people` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `pets` on the `people` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `people` MODIFY `children` INTEGER NULL,
    MODIFY `pets` INTEGER NULL;
