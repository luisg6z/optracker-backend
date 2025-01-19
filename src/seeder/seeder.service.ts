import { Injectable } from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';
import { EducationService } from 'src/education/education.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SeederService {
  constructor(
    private readonly educationSeed: EducationService,
    private readonly prisma: PrismaService,
    private readonly adminSeed: AdminService,
  ) {}
  async seedAll() {
    if ((await this.prisma.education.count()) != 0) {
      console.log('Education already exists in the database');
      return;
    }
    if ((await this.prisma.administrator.count()) != 0) {
      console.log('Admin already exists in the database');
    }

    await this.educationSeed.seed();
    await this.adminSeed.seed();
  }
}
