/*
  Warnings:

  - You are about to drop the `ReadjustmentIndex` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `updated_tables` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ReadjustmentIndex";

-- DropTable
DROP TABLE "updated_tables";

-- CreateTable
CREATE TABLE "Readjustment_index" (
    "id" SERIAL NOT NULL,
    "id_index_readjustment_imobzi" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Readjustment_index_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "webhooks" (
    "id" SERIAL NOT NULL,
    "event" TEXT NOT NULL,
    "entity_id" TEXT NOT NULL,

    CONSTRAINT "webhooks_pkey" PRIMARY KEY ("id")
);
