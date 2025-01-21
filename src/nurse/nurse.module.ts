import { Module } from '@nestjs/common';
import { EducationService } from 'src/education/education.service';
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
