import { Module } from '@nestjs/common';
import { NurseService } from './nurse.service';
import { NurseController } from './nurse.controller';

@Module({
  controllers: [NurseController],
  providers: [NurseService],
})
export class NurseModule {}
