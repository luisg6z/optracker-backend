import { Module } from '@nestjs/common';
import { PatientModule } from 'src/patient/patient.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GetSurgeryAction } from './services/get-surgery.action';
import { SurgeryService } from './services/surgery.service';
import { SurgeryController } from './surgery.controller';

@Module({
  controllers: [SurgeryController],
  providers: [SurgeryService, GetSurgeryAction],
  imports: [PrismaModule, PatientModule],
})
export class SurgeryModule {}
