import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SurgeryService } from './services/surgery.service';
import { SurgeryController } from './surgery.controller';

@Module({
  controllers: [SurgeryController],
  providers: [SurgeryService],
  imports: [PrismaModule],
})
  
export class SurgeryModule {}
