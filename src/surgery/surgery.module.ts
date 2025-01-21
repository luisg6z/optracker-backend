import { Module } from '@nestjs/common';
import { DoctorService } from 'src/doctor/doctor.service';
import { EducationService } from 'src/education/education.service';
import { NurseModule } from 'src/nurse/nurse.module';
import { PatientModule } from 'src/patient/patient.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GetProcedureAction } from 'src/procedure/services/get-procedure.action';
import { ProcedureService } from 'src/procedure/services/procedure.service';
import { PutProcedureAction } from 'src/procedure/services/put-procedure.action';
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
