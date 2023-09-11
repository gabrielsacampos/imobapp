/*
  Warnings:

  - You are about to drop the column `leaseId` on the `tenants` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `tenants` DROP FOREIGN KEY `tenants_leaseId_fkey`;

-- AlterTable
ALTER TABLE `tenants` DROP COLUMN `leaseId`,
    ADD COLUMN `lease_id` BIGINT NULL;

-- AddForeignKey
ALTER TABLE `tenants` ADD CONSTRAINT `tenants_lease_id_fkey` FOREIGN KEY (`lease_id`) REFERENCES `leases`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
