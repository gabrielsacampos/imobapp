/*
  Warnings:

  - Added the required column `error` to the `logger` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "logger" ADD COLUMN     "error" TEXT NOT NULL;
