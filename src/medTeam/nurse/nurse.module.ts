import { EducationService } from '@/medTeam/education/education.service';
import { PrismaService } from '@/prisma/prisma.service';
import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NurseController } from './nurse.controller';
import { NurseService } from './nurse.service';

@Module({
  controllers: [NurseController],
  providers: [NurseService, EducationService],
  imports: [PrismaModule],
  exports: [NurseService],
})
export class NurseModule implements OnModuleInit {
  private readonly logger = new Logger(NurseModule.name);
  constructor(
    private readonly nurseService: NurseService,
    private readonly prisma: PrismaService,
  ) {}
  async onModuleInit() {
    if ((await this.prisma.nurse.count()) != 0) {
      this.logger.log('Nurse already exists in the database');
      return;
    }
    await this.nurseService.seed();
  }
}
