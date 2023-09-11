/*
  Warnings:

  - You are about to drop the column `tenant_id_organization` on the `tenants` table. All the data in the column will be lost.
  - You are about to drop the column `tenant_id_person` on the `tenants` table. All the data in the column will be lost.
  - You are about to drop the column `tenant_type` on the `tenants` table. All the data in the column will be lost.
  - Added the required column `id_tenant_organization` to the `tenants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_tenant_person` to the `tenants` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `tenants` DROP FOREIGN KEY `tenants_tenant_id_organization_fkey`;

-- DropForeignKey
ALTER TABLE `tenants` DROP FOREIGN KEY `tenants_tenant_id_person_fkey`;

-- AlterTable
ALTER TABLE `tenants` DROP COLUMN `tenant_id_organization`,
    DROP COLUMN `tenant_id_person`,
    DROP COLUMN `tenant_type`,
    ADD COLUMN `id_tenant_organization` BIGINT NOT NULL,
    ADD COLUMN `id_tenant_person` BIGINT NOT NULL;

-- AddForeignKey
ALTER TABLE `tenants` ADD CONSTRAINT `tenants_id_tenant_organization_fkey` FOREIGN KEY (`id_tenant_organization`) REFERENCES `organizations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tenants` ADD CONSTRAINT `tenants_id_tenant_person_fkey` FOREIGN KEY (`id_tenant_person`) REFERENCES `people`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
