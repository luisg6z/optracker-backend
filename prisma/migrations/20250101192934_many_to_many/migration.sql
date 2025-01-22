/*
  Warnings:

  - The primary key for the `Procedure` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `surgeryId` on the `Procedure` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Procedure" DROP CONSTRAINT "Procedure_pkey",
DROP COLUMN "surgeryId",
ADD COLUMN     "surgeryId" INTEGER NOT NULL,
ADD CONSTRAINT "Procedure_pkey" PRIMARY KEY ("id", "surgeryId");

-- CreateTable
CREATE TABLE "NurseStudies" (
    "nurseId" INTEGER NOT NULL,
    "educationId" INTEGER NOT NULL,

    CONSTRAINT "NurseStudies_pkey" PRIMARY KEY ("nurseId","educationId")
);

-- CreateTable
CREATE TABLE "DoctorSurgery" (
    "doctorId" INTEGER NOT NULL,
    "surgeryId" INTEGER NOT NULL,

    CONSTRAINT "DoctorSurgery_pkey" PRIMARY KEY ("surgeryId","doctorId")
);

-- CreateTable
CREATE TABLE "NurseSurgery" (
    "nurseId" INTEGER NOT NULL,
    "surgeryId" INTEGER NOT NULL,

    CONSTRAINT "NurseSurgery_pkey" PRIMARY KEY ("surgeryId","nurseId")
);

-- AddForeignKey
ALTER TABLE "Procedure" ADD CONSTRAINT "Procedure_surgeryId_fkey" FOREIGN KEY ("surgeryId") REFERENCES "Surgery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NurseStudies" ADD CONSTRAINT "NurseStudies_nurseId_fkey" FOREIGN KEY ("nurseId") REFERENCES "Nurse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NurseStudies" ADD CONSTRAINT "NurseStudies_educationId_fkey" FOREIGN KEY ("educationId") REFERENCES "Education"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorSurgery" ADD CONSTRAINT "DoctorSurgery_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorSurgery" ADD CONSTRAINT "DoctorSurgery_surgeryId_fkey" FOREIGN KEY ("surgeryId") REFERENCES "Surgery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NurseSurgery" ADD CONSTRAINT "NurseSurgery_nurseId_fkey" FOREIGN KEY ("nurseId") REFERENCES "Nurse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NurseSurgery" ADD CONSTRAINT "NurseSurgery_surgeryId_fkey" FOREIGN KEY ("surgeryId") REFERENCES "Surgery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
