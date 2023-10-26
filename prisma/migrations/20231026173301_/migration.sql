/*
  Warnings:

  - You are about to drop the column `queue` on the `failed_queue_jobs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "failed_queue_jobs" DROP COLUMN "queue";
