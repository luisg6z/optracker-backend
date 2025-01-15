import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProcedureController } from './procedure.controller';
import { GetProcedureAction } from './services/get-procedure.action';
import { ProcedureService } from './services/procedure.service';
import { PutProcedureAction } from './services/put-procedure.action';

@Module({
  controllers: [ProcedureController],
  providers: [ProcedureService, GetProcedureAction, PutProcedureAction],
  imports: [PrismaModule],
})
export class ProcedureModule {}
