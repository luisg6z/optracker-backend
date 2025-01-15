/*
  Warnings:

  - Added the required column `durationValue` to the `Procedure` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `duration` on the `Procedure` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Duration" AS ENUM ('MINUTOS', 'HORAS');

-- AlterTable
ALTER TABLE "Procedure" ADD COLUMN     "durationValue" INTEGER NOT NULL,
DROP COLUMN "duration",
ADD COLUMN     "duration" "Duration" NOT NULL;
