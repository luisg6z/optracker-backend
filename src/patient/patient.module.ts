import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';

@Module({
  controllers: [PatientController],
  providers: [PatientService],
  imports: [PrismaModule],
})
export class PatientModule {}
