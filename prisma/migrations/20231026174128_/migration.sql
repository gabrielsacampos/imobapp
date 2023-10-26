-- AlterTable
ALTER TABLE "failed_queue_jobs" ADD COLUMN     "job_name" TEXT,
ADD COLUMN     "queue" TEXT;

-- DropEnum
DROP TYPE "Queue";
