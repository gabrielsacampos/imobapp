-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "failed_queue_jobs" (
    "id" SERIAL NOT NULL,
    "queue" TEXT NOT NULL,
    "redis_key" TEXT NOT NULL,
    "job" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'failed',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "failed_queue_jobs_pkey" PRIMARY KEY ("id")
);
