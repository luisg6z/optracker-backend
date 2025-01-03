import { Module } from '@nestjs/common';
import { NurseService } from './nurse.service';
import { NurseController } from './nurse.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [NurseController],
  providers: [NurseService],
  imports: [PrismaModule],
  exports: [NurseService],
})
export class NurseModule {}
