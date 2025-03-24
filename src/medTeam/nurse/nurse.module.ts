import { EducationService } from '@/medTeam/education/education.service';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NurseController } from './nurse.controller';
import { NurseService } from './nurse.service';

@Module({
  controllers: [NurseController],
  providers: [NurseService, EducationService],
  imports: [PrismaModule],
  exports: [NurseService],
})
export class NurseModule {}
