-- AlterTable
ALTER TABLE "leases" ADD COLUMN     "end_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
