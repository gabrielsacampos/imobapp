/*
  Warnings:

  - You are about to drop the `logger` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "logger";

-- CreateTable
CREATE TABLE "logger_queue" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "queue" TEXT NOT NULL,
    "error" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "logger_queue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "logger_queue_id_key" ON "logger_queue"("id");
