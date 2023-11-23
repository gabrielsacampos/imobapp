/*
  Warnings:

  - You are about to drop the `Logger` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Logger";

-- CreateTable
CREATE TABLE "logger" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "queue" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "logger_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "logger_id_key" ON "logger"("id");
