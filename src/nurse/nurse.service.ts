import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as bcrypt from 'bcrypt';
import {
  AlreadyExistsError,
  NotFoundError,
  UnexpectedError,
} from 'src/common/errors/service.errors';
import { EducationService } from 'src/education/education.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNurseDto } from './dto/create-nurse.dto';
import { UpdateNurseDto } from './dto/update-nurse.dto';

@Injectable()
export class NurseService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly educationService: EducationService,
  ) {}

  async create(createNurseDto: CreateNurseDto) {
    try {
      const hashedPassword = await bcrypt.hash(
        createNurseDto.password,
        Number(process.env.SALT_ROUNDS),
      );

      const { educationIds, ...nurseData } = createNurseDto;

      const nurseStudies = [];
      for (const value of educationIds) {
        const education = await this.educationService.findOneByName(value);
        if (!education) {
          throw new NotFoundError('Education does not exists!');
        }
        nurseStudies.push({
          educationId: education.id,
        });
      }

      return await this.prisma.nurse.create({
        data: {
          ...nurseData,
          password: hashedPassword,
          NurseStudies: {
            create: nurseStudies,
          },
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `A Nurse with the email ${createNurseDto.email} already exists`,
          );
        }
      }
      throw new UnexpectedError(error.message);
    }
  }

  async findAll() {
    return await this.prisma.nurse.findMany({
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
        speciality: true,
        licenseNumber: true,
        dea: true,
        dni: true,
        NurseStudies: {
          select: {
            education: true,
          },
        },
      },
    });
  }

  async findOnebyId(id: number) {
    try {
      return await this.prisma.nurse.findUniqueOrThrow({
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
          lastName: true,
          email: true,
          speciality: true,
          licenseNumber: true,
          dea: true,
          dni: true,
          NurseStudies: {
            select: {
              education: true,
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(`A nurse with the id ${id} doesn't exists`);
        }
      }
      throw new UnexpectedError('a unexpected situation ocurred');
    }
  }

  async findOneByEmail(email: string) {
    return await this.prisma.nurse.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });
  }

  async update(id: number, updateNurseDto: UpdateNurseDto) {
    try {
      return await this.prisma.nurse.update({
        where: {
          id: id,
        },
        data: updateNurseDto,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(`A nurse with the id ${id} doesn't exists`);
        }
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `A nurse with the email ${updateNurseDto.email} already exists`,
          );
        }
      }
      throw new UnexpectedError('a unexpected situation ocurred');
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.nurse.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(`A nurse with the id ${id} doesn't exists`);
        }
      }
      throw new UnexpectedError('an unexpected situation ocurred');
    }
  }

  async seed() {
    const nurseData = [
      {
        name: 'Juan',
        lastName: 'Perez',
        email: 'JuanP123@gmail.com',
        password: '123456',
        speciality: 'Recuperacion',
        licenseNumber: '423462',
        dea: '238746',
        dni: '444785',
        educationIds: ['Universidad de Oriente'],
      },
      {
        name: 'Maria',
        lastName: 'Gonzalez',
        email: 'mgonzalez18@gmail.com',
        password: '478513',
        speciality: 'Anestesista',
        licenseNumber: '478416',
        dea: '885136',
        dni: '021595',
        educationIds: ['Universidad de Oriente'],
      },
      {
        name: 'Pedro',
        lastName: 'Gomez',
        email: 'PedroGomez@gmail.com',
        password: '774116',
        speciality: 'Instrumentista',
        licenseNumber: '845631',
        dea: '789456',
        dni: '123654',
        educationIds: ['Universidad de Oriente'],
      },
      {
        name: 'Jose',
        lastName: 'Martinez',
        email: 'JM1986@gmail.com',
        password: '454568',
        speciality: 'Cuidados Intensivos',
        licenseNumber: '7416995',
        dea: '324886',
        dni: '541263',
        educationIds: ['Universidad de Oriente'],
      },
      {
        name: 'Ana',
        lastName: 'Rodriguez',
        email: 'AnRo@gmail.com',
        password: '486541',
        speciality: 'Quirofano',
        licenseNumber: '545842',
        dea: '221188',
        dni: '852465',
        educationIds: ['Universidad de Oriente'],
      }
    ];
  }
}
