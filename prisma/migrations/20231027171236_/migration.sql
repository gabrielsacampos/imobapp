/*
  Warnings:

  - You are about to drop the `webhooks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "webhooks";

-- CreateTable
CREATE TABLE "webhooks" (
    "id" SERIAL NOT NULL,
    "event" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "id_entity_imobzi" TEXT NOT NULL,

    CONSTRAINT "webhooks_pkey" PRIMARY KEY ("id")
);
