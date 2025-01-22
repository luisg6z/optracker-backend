import { Module } from '@nestjs/common';
import { EducationService } from 'src/education/education.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';

@Module({
  controllers: [DoctorController],
  providers: [DoctorService, EducationService],
  imports: [PrismaModule],
  exports: [DoctorModule],
})
export class DoctorModule {}
