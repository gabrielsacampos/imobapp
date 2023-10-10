/*
  Warnings:

  - You are about to drop the `Readjustment_index` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Readjustment_index";

-- CreateTable
CREATE TABLE "readjustment_indexes" (
    "id" SERIAL NOT NULL,
    "id_index_readjustment_imobzi" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "readjustment_indexes_pkey" PRIMARY KEY ("id")
);
