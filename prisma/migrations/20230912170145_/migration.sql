/*
  Warnings:

  - You are about to drop the column `id_buildinng` on the `leases` table. All the data in the column will be lost.
  - You are about to drop the column `id_organization` on the `leases` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `leases` DROP FOREIGN KEY `leases_id_buildinng_fkey`;

-- DropForeignKey
ALTER TABLE `leases` DROP FOREIGN KEY `leases_id_organization_fkey`;

-- AlterTable
ALTER TABLE `leases` DROP COLUMN `id_buildinng`,
    DROP COLUMN `id_organization`;
