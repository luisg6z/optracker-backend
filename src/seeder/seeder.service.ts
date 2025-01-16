import { Injectable } from '@nestjs/common';
import { EducationService } from 'src/education/education.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SeederService {
  constructor(
    private readonly educationSeed: EducationService,
    private readonly prisma: PrismaService,
  ) {}
  async seedAll() {
    if ((await this.prisma.education.count()) != 0) {
      console.log('Education already exists in the database');
      return;
    }

    await this.educationSeed.seed();
  }
}
