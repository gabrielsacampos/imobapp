/*
  Warnings:

  - You are about to drop the column `entity_id` on the `webhooks` table. All the data in the column will be lost.
  - Added the required column `id_entity_imobzi` to the `webhooks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "webhooks" DROP COLUMN "entity_id",
ADD COLUMN     "done" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "id_entity_imobzi" TEXT NOT NULL;
