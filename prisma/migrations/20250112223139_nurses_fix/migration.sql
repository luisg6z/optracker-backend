/*
  Warnings:

  - Added the required column `dni` to the `Nurse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Nurse" ADD COLUMN     "dni" TEXT NOT NULL;
