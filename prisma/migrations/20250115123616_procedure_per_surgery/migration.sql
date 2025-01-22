/*
  Warnings:

  - The primary key for the `Procedure` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `surgeryId` on the `Procedure` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Procedure" DROP CONSTRAINT "Procedure_surgeryId_fkey";

-- AlterTable
ALTER TABLE "Administrator" ADD COLUMN     "deleteAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Nurse" ADD COLUMN     "deleteAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Procedure" DROP CONSTRAINT "Procedure_pkey",
DROP COLUMN "surgeryId",
ADD COLUMN     "deleteAt" TIMESTAMP(3),
ADD CONSTRAINT "Procedure_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Surgery" ADD COLUMN     "deleteAt" TIMESTAMP(3),
ADD COLUMN     "time" TIMESTAMP(3),
ALTER COLUMN "status" SET DEFAULT 'SCHEDULED';

-- CreateTable
CREATE TABLE "ProcedurePerSurgery" (
    "surgeryId" INTEGER NOT NULL,
    "procedureId" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProcedurePerSurgery_pkey" PRIMARY KEY ("surgeryId","procedureId")
);

-- AddForeignKey
ALTER TABLE "ProcedurePerSurgery" ADD CONSTRAINT "ProcedurePerSurgery_procedureId_fkey" FOREIGN KEY ("procedureId") REFERENCES "Procedure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcedurePerSurgery" ADD CONSTRAINT "ProcedurePerSurgery_surgeryId_fkey" FOREIGN KEY ("surgeryId") REFERENCES "Surgery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
