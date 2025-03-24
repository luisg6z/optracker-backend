import { PatientModule } from '@/client/patient/patient.module';
import { GetProcedureAction } from '@/medProcedure/procedure/services/get-procedure.action';
import { ProcedureService } from '@/medProcedure/procedure/services/procedure.service';
import { PutProcedureAction } from '@/medProcedure/procedure/services/put-procedure.action';
import { DoctorService } from '@/medTeam/doctor/doctor.service';
import { EducationService } from '@/medTeam/education/education.service';
import { NurseModule } from '@/medTeam/nurse/nurse.module';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GetSurgeryAction } from './services/get-surgery.action';
import { PutSurgeryAction } from './services/put-surgery.action';
import { SurgeryService } from './services/surgery.service';
import { SurgeryController } from './surgery.controller';

@Module({
  controllers: [SurgeryController],
  providers: [
    SurgeryService,
    GetSurgeryAction,
    PutSurgeryAction,
    DoctorService,
    EducationService,
    ProcedureService,
    GetProcedureAction,
    PutProcedureAction,
  ],
  imports: [PrismaModule, PatientModule, NurseModule],
})
export class SurgeryModule {}
