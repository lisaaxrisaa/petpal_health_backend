/*
  Warnings:

  - Made the column `petName` on table `HealthLog` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "HealthLog" ALTER COLUMN "petName" SET NOT NULL;
