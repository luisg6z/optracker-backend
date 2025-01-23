import { Module } from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';
import { DoctorService } from 'src/doctor/doctor.service';
import { EducationService } from 'src/education/education.service';
import { NurseService } from 'src/nurse/nurse.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SeederController } from './seeder.controller';
import { SeederService } from './seeder.service';

@Module({
  controllers: [SeederController],
  providers: [
    SeederService,
    EducationService,
    AdminService,
    DoctorService,
    NurseService,
  ],
  imports: [PrismaModule],
})
export class SeederModule {}
