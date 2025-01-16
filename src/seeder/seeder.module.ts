import { Module } from '@nestjs/common';
import { EducationService } from 'src/education/education.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SeederController } from './seeder.controller';
import { SeederService } from './seeder.service';

@Module({
  controllers: [SeederController],
  providers: [SeederService, EducationService],
  imports: [PrismaModule],
})
export class SeederModule {}
