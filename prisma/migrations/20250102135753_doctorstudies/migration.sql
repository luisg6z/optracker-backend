/*
  Warnings:

  - You are about to drop the column `doctorId` on the `Education` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Education" DROP CONSTRAINT "Education_doctorId_fkey";

-- AlterTable
ALTER TABLE "Education" DROP COLUMN "doctorId";
