import { EducationService } from '@/medTeam/education/education.service';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import {
  AlreadyExistsError,
  NotFoundError,
  UnexpectedError,
} from 'src/common/errors/service.errors';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorService implements OnModuleInit {
  private readonly logger = new Logger(DoctorService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly educationService: EducationService,
  ) {}

  async create(createDoctorDto: CreateDoctorDto) {
    try {
      const doctorExists = await this.findOneByDNI(createDoctorDto.dni);

      if (doctorExists.length !== 0) {
        throw new AlreadyExistsError(
          `A Doctor with the dni ${createDoctorDto.dni} already exists`,
        );
      }

      const { educationIds, ...doctorData } = createDoctorDto;

      const doctorStudies = [];
      for (const value of educationIds) {
        const education = await this.educationService.findOneByName(value);
        if (!education) {
          throw new NotFoundError('Education does not exists!');
        }
        doctorStudies.push({
          educationId: education.id,
        });
      }

      return await this.prisma.doctor.create({
        data: {
          DoctorStudies: {
            create: doctorStudies,
          },
          ...doctorData,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error?.code === 'P2002'
      ) {
        throw new AlreadyExistsError(
          `A Doctor with the dni ${createDoctorDto.dni} already exists`,
        );
      }
      if (error instanceof AlreadyExistsError) {
        throw new AlreadyExistsError(error.message);
      }
      console.log(error.message);
      throw new UnexpectedError('An unexpected error ocurred');
    }
  }

  async findAll() {
    return await this.prisma.doctor.findMany({
      select: {
        id: true,
        dni: true,
        dea: true,
        names: true,
        lastNames: true,
        speciality: true,
        licenseNumber: true,
        DoctorStudies: {
          select: {
            education: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    try {
      return await this.prisma.doctor.findUniqueOrThrow({
        where: {
          id: id,
        },
        select: {
          id: true,
          dni: true,
          dea: true,
          names: true,
          lastNames: true,
          speciality: true,
          licenseNumber: true,
          DoctorStudies: {
            select: {
              education: true,
            },
          },
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error?.code === 'P2025'
      ) {
        throw new NotFoundError(`A doctor with the id ${id} doesn't exists`);
      }
      throw new UnexpectedError('a unexpected situation ocurred');
    }
  }

  async findOneByDNI(dni: string) {
    try {
      return await this.prisma.doctor.findMany({
        where: {
          dni: dni,
        },
        select: {
          id: true,
          dni: true,
          dea: true,
          names: true,
          lastNames: true,
          speciality: true,
          licenseNumber: true,
        },
      });
    } catch (error) {}
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    try {
      return await this.prisma.doctor.update({
        where: {
          id: id,
        },
        data: updateDoctorDto,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(`A doctor with the id ${id} doesn't exists`);
        }
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `A doctor with the dni ${updateDoctorDto.dni} already exists`,
          );
        }
      }
      throw new UnexpectedError('a unexpected situation ocurred');
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.doctor.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error?.code === 'P2025'
      ) {
        throw new NotFoundError(`A doctor with the id ${id} doesn't exists`);
      }
      throw new UnexpectedError('An unexpected situation ocurred');
    }
  }

  async seed() {
    const doctors = [
      {
        dni: '12345678',
        dea: '246810',
        names: 'Juan',
        lastNames: 'Perez',
        speciality: 'Cirujano General',
        licenseNumber: '4785126',
        educationIds: ['Cirujanos maxilofaciales', 'Cirujanos oncólogos'],
      },
      {
        dni: '87654321',
        dea: '135790',
        names: 'Maria',
        lastNames: 'Rodriguez',
        speciality: 'Cirujano Plastico',
        licenseNumber: '1234567',
        educationIds: ['Cirujanos pediátricos'],
      },
      {
        dni: '45678912',
        dea: '246810',
        names: 'Pedro',
        lastNames: 'Fernandez',
        speciality: 'Neurocirujano',
        licenseNumber: '4785126',
        educationIds: ['Cirujanos plásticos'],
      },
      {
        dni: '98765432',
        dea: '135790',
        names: 'Jose',
        lastNames: 'Gonzalez',
        speciality: 'Cardiologo',
        licenseNumber: '1234567',
        educationIds: ['Neurocirujanos'],
      },
    ];

    // const doctorStudies = [];
    // for (const value of educationIds) {
    //   const education = await this.educationService.findOneByName(value);
    //   if (!education) {
    //     throw new NotFoundError('Education does not exists!');
    //   }
    //   doctorStudies.push({
    //     educationId: education.id,
    //   });
    // }

    for (const doctor of doctors) {
      await this.create(doctor);
    }
  }
  async onModuleInit() {
    if ((await this.prisma.doctor.count()) != 0) {
      this.logger.log('Doctor already exists in the database');
      return;
    }
    await this.seed();
  }
}
