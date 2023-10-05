/*
  Warnings:

  - You are about to alter the column `due_date` on the `invoices` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `paid_at` on the `invoices` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `credit_at` on the `invoices` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `due_date` on the `lease_items` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `start_date` on the `lease_items` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `start_at` on the `leases` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to drop the column `birthdate` on the `people` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `invoices` MODIFY `due_date` DATETIME(3) NOT NULL,
    MODIFY `paid_at` DATETIME(3) NULL,
    MODIFY `credit_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `lease_items` MODIFY `due_date` DATETIME(3) NOT NULL,
    MODIFY `start_date` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `leases` MODIFY `start_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `people` DROP COLUMN `birthdate`,
    ADD COLUMN `DateTime` DATETIME(3) NULL;
