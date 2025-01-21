import { Module } from '@nestjs/common';
import { PatientModule } from 'src/patient/patient.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmergencyContactController } from './emergency-contact.controller';
import { EmergencyContactService } from './services/emergency-contact.service';
import { GetEmergencyContactAction } from './services/get-emergencyContact.action';
import { PutEmergencyContactAction } from './services/put-emergencyContact.action';

@Module({
  controllers: [EmergencyContactController],
  providers: [
    EmergencyContactService,
    GetEmergencyContactAction,
    PutEmergencyContactAction,
  ],
  imports: [PrismaModule, PatientModule],
})
export class EmergencyContactModule {}
