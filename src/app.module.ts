import { AdminModule } from '@/admin/admin.module';
import { AppService } from '@/app.service';
import { AuthModule } from '@/auth/auth.module';
import { EmergencyContactModule } from '@/client/emergency-contact/emergency-contact.module';
import { PatientModule } from '@/client/patient/patient.module';
import { ConfigModule } from '@/common/config/config.module';
import { ProcedureModule } from '@/medProcedure/procedure/procedure.module';
import { SurgeryModule } from '@/medProcedure/surgery/surgery.module';
import { DoctorModule } from '@/medTeam/doctor/doctor.module';
import { EducationModule } from '@/medTeam/education/education.module';
import { NurseModule } from '@/medTeam/nurse/nurse.module';
import { PrismaModule } from '@/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

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
    EmergencyContactModule,
    SurgeryModule,
    ProcedureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
