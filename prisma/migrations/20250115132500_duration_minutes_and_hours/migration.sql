/*
  Warnings:

  - You are about to drop the column `duration` on the `Procedure` table. All the data in the column will be lost.
  - You are about to drop the column `durationValue` on the `Procedure` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Procedure" DROP COLUMN "duration",
DROP COLUMN "durationValue",
ADD COLUMN     "durationHours" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "durationMinutes" INTEGER NOT NULL DEFAULT 0;
