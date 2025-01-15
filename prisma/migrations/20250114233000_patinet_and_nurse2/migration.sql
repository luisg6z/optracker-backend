/*
  Warnings:

  - Added the required column `updateAt` to the `Administrator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `DoctorStudies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `DoctorSurgery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `Education` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `EmergencyContact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `Nurse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `NurseStudies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `NurseSurgery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `Procedure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `Surgery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Administrator" ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleteAt" TIMESTAMP(3),
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "DoctorStudies" ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "DoctorSurgery" ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Education" ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "EmergencyContact" ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Nurse" ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "NurseStudies" ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "NurseSurgery" ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Procedure" ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Surgery" ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;
