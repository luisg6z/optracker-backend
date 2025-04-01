import { PrismaService } from '@/prisma/prisma.service';
import { Logger, Module, OnModuleInit } from '@nestjs/common';
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
export class ProcedureModule implements OnModuleInit {
  private readonly logger = new Logger(ProcedureService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly procedureService: ProcedureService,
  ) {}
  async onModuleInit() {
    if ((await this.prisma.procedure.count()) != 0) {
      this.logger.log('Procedure already exists in the database');
      return;
    }
    await this.procedureService.seed();
  }
}
