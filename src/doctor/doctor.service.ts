import { Injectable } from '@nestjs/common';
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
export class DoctorService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDoctorDto: CreateDoctorDto) {
    try {
      const doctor = await this.findOneByDNI(createDoctorDto.dni);

      if (doctor.length !== 0) {
        throw new AlreadyExistsError(
          `A Doctor with the dni ${createDoctorDto.dni} already exists`,
        );
      }

      return await this.prisma.doctor.create({
        data: {
          dni: createDoctorDto.dni,
          dea: createDoctorDto.dea,
          names: createDoctorDto.name,
          lastNames: createDoctorDto.lastName,
          speciality: createDoctorDto.speciality,
          licenseNumber: createDoctorDto.licneseNumber,
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
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error?.code === 'P2025'
      ) {
        throw new NotFoundError(`A nurse with the id ${id} doesn't exists`);
      }
      throw new UnexpectedError('a unexpected situation ocurred');
    }
  }

  async findOneByDNI(dni: string) {
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
}
