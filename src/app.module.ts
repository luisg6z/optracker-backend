import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './common/config/config.module';
import { DoctorModule } from './doctor/doctor.module';
import { NurseModule } from './nurse/nurse.module';
import { PrismaModule } from './prisma/prisma.module';
import { EducationModule } from './education/education.module';
import { PatientModule } from './patient/patient.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    AdminModule,
    NurseModule,
    ConfigModule,
    DoctorModule,
    EducationModule,
    PatientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
