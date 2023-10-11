/*
  Warnings:

  - The `credit_at` column on the `invoices` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "credit_at",
ADD COLUMN     "credit_at" TIMESTAMP(3);
