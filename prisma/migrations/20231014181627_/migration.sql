/*
  Warnings:

  - Added the required column `error_message` to the `failed_queue_jobs` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `queue` on the `failed_queue_jobs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `job` on the `failed_queue_jobs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Queue" AS ENUM ('granatum_queue', 'imobzi_queue');

-- AlterTable
ALTER TABLE "failed_queue_jobs" ADD COLUMN     "error_message" TEXT NOT NULL,
DROP COLUMN "queue",
ADD COLUMN     "queue" "Queue" NOT NULL,
DROP COLUMN "job",
ADD COLUMN     "job" JSONB NOT NULL;
