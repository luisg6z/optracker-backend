import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EducationController } from './education.controller';
import { EducationService } from './education.service';

@Module({
  controllers: [EducationController],
  providers: [EducationService],
  imports: [PrismaModule],
})
export class EducationModule {}
