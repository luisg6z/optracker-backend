/*
  Warnings:

  - A unique constraint covering the columns `[familyCode]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `familyCode` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "familyCode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Patient_familyCode_key" ON "Patient"("familyCode");
