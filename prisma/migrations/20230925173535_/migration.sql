/*
  Warnings:

  - You are about to drop the column `invoice_id` on the `invoices_items` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_invoice_imobzi]` on the table `invoices` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_invoice_imobzi` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_invoice_imobzi` to the `invoices_items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `invoices_items` DROP FOREIGN KEY `invoices_items_invoice_id_fkey`;

-- AlterTable
ALTER TABLE `invoices` ADD COLUMN `id_invoice_imobzi` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `invoices_items` DROP COLUMN `invoice_id`,
    ADD COLUMN `id_invoice_imobzi` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `invoices_id_invoice_imobzi_key` ON `invoices`(`id_invoice_imobzi`);

-- AddForeignKey
ALTER TABLE `invoices_items` ADD CONSTRAINT `invoices_items_id_invoice_imobzi_fkey` FOREIGN KEY (`id_invoice_imobzi`) REFERENCES `invoices`(`id_invoice_imobzi`) ON DELETE CASCADE ON UPDATE CASCADE;
