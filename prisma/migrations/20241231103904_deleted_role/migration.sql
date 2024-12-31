/*
  Warnings:

  - You are about to drop the column `role` on the `Administrator` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Nurse` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Administrator" DROP COLUMN "role";

-- AlterTable
ALTER TABLE "Nurse" DROP COLUMN "role";
