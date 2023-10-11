/*
  Warnings:

  - Added the required column `id_lease_imobzi` to the `invoices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "invoices" ADD COLUMN     "id_lease_imobzi" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_id_lease_imobzi_fkey" FOREIGN KEY ("id_lease_imobzi") REFERENCES "leases"("id_imobzi") ON DELETE CASCADE ON UPDATE CASCADE;
