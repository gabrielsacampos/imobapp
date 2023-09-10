/*
  Warnings:

  - You are about to alter the column `duration` on the `leases` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `leases` MODIFY `duration` INTEGER NOT NULL,
    MODIFY `fee` DECIMAL(65, 30) NOT NULL,
    MODIFY `guarantee_value` DECIMAL(65, 30) NULL,
    MODIFY `lease_value` DECIMAL(65, 30) NOT NULL;
