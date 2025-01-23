import { Injectable } from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';
import { DoctorService } from 'src/doctor/doctor.service';
import { EducationService } from 'src/education/education.service';
import { NurseService } from 'src/nurse/nurse.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProcedureService } from 'src/procedure/services/procedure.service';

@Injectable()
export class SeederService {
  constructor(
    private readonly educationSeed: EducationService,
    private readonly prisma: PrismaService,
    private readonly adminSeed: AdminService,
    private readonly doctorSeed: DoctorService,
    private readonly nurseSeed: NurseService,
    private readonly procedureSeed: ProcedureService,
  ) {}
  async seedAll() {
    if ((await this.prisma.education.count()) != 0) {
      console.log('Education already exists in the database');
      return;
    }
    await this.educationSeed.seed();
    if ((await this.prisma.administrator.count()) != 0) {
      console.log('Admin already exists in the database');
    }
    if ((await this.prisma.nurse.count()) != 0) {
      console.log('Nurse already exists in the database');
    }
    if ((await this.prisma.doctor.count()) != 0) {
      console.log('Doctor already exists in the database');
    }
    if ((await this.prisma.procedure.count()) != 0) {
      console.log('Procedure already exists in the database');
    }

    await Promise.all([
      this.adminSeed.seed(),
      this.doctorSeed.seed(),
      this.nurseSeed.seed(),
      this.procedureSeed.seed(),
    ]);
  }
}
