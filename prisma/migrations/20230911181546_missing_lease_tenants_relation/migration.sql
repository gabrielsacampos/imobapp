/*
  Warnings:

  - The primary key for the `tenants` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `tenants` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `tenants` DROP PRIMARY KEY,
    ADD COLUMN `leaseId` BIGINT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `tenants` ADD CONSTRAINT `tenants_leaseId_fkey` FOREIGN KEY (`leaseId`) REFERENCES `leases`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
