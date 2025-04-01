import { EducationService } from '@/medTeam/education/education.service';
import { PrismaService } from '@/prisma/prisma.service';
import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';

@Module({
  controllers: [DoctorController],
  providers: [DoctorService, EducationService],
  imports: [PrismaModule],
  exports: [DoctorModule],
})
export class DoctorModule implements OnModuleInit {
  private readonly logger = new Logger(DoctorService.name);

  constructor(
    private readonly doctorService: DoctorService,
    private readonly prisma: PrismaService,
  ) {}

  async onModuleInit() {
    if ((await this.prisma.doctor.count()) != 0) {
      this.logger.log('Doctor already exists in the database');
      return;
    }
    await this.doctorService.seed();
  }
}
