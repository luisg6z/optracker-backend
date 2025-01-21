import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PatientController } from './patient.controller';
import { GetPatientAction } from './services/get-patient.action';
import { PatientService } from './services/patient.service';
import { UUIDService } from './services/UUID.service';

@Module({
  controllers: [PatientController],
  providers: [PatientService, GetPatientAction, UUIDService],
  imports: [PrismaModule],
  exports: [PatientService],
})
export class PatientModule {}
