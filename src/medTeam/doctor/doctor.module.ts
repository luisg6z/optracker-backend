import { EducationService } from '@/medTeam/education/education.service';
import { Module } from '@nestjs/common';
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
