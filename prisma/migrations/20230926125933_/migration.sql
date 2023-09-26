/*
  Warnings:

  - You are about to drop the column `id_lease_imobzi` on the `invoices` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `invoices` DROP FOREIGN KEY `invoices_id_lease_imobzi_fkey`;

-- AlterTable
ALTER TABLE `invoices` DROP COLUMN `id_lease_imobzi`;
