import { PrismaService } from '@/prisma/prisma.service';
import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EducationController } from './education.controller';
import { EducationService } from './education.service';

@Module({
  controllers: [EducationController],
  providers: [EducationService],
  imports: [PrismaModule],
})
export class EducationModule implements OnModuleInit {
  private readonly logger = new Logger(EducationModule.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly educationService: EducationService,
  ) {}

  async onModuleInit() {
    if ((await this.prisma.education.count()) != 0) {
      this.logger.log('Education already exists in the database');
      return;
    }
    await this.educationService.seed();
  }
}
