import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import {
  AlreadyExistsError,
  NotFoundError,
  UnexpectedError,
} from 'src/common/errors/service.errors';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPatientDto: CreatePatientDto) {
    try {
      const patientExists = await this.findOneByDNI(createPatientDto.dni);

      if (patientExists.length !== 0) {
        throw new AlreadyExistsError(
          `A Patient with the dni ${createPatientDto.dni} already exists`,
        );
      }

      return await this.prisma.patient.create({
        data: createPatientDto,
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error?.code === 'P2002'
      ) {
        throw new AlreadyExistsError(
          `A Patient with the dni ${createPatientDto.dni} already exists`,
        );
      }
      if (error instanceof AlreadyExistsError) {
        throw new AlreadyExistsError(error.message);
      }
      throw new UnexpectedError('An unexpected error ocurred');
    }
  }

  // ? See the output of EmergencyContact and Surgery
  // ! Make endpoints for getting the information of it's contacts and surgicla history
  async findAll() {
    return await this.prisma.patient.findMany({
      select: {
        id: true,
        dni: true,
        name: true,
        lastName: true,
        email: true,
        bloodType: true,
        gender: true,
        height: true,
        weight: true,
        EmergencyContact: true,
        Surgery: true,
      },
    });
  }

  async findOne(id: number) {
    try {
      return await this.prisma.patient.findUniqueOrThrow({
        where: {
          id: id,
        },
        select: {
          id: true,
          dni: true,
          name: true,
          lastName: true,
          email: true,
          bloodType: true,
          gender: true,
          height: true,
          weight: true,
          EmergencyContact: true,
          Surgery: true,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error?.code === 'P2025'
      ) {
        throw new NotFoundError(`A patient with the id ${id} doesn't exists`);
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

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    try {
      return await this.prisma.patient.update({
        where: {
          id: id,
        },
        data: updatePatientDto,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(`A patient with the id ${id} doesn't exists`);
        }
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `A patient with the dni ${updatePatientDto.dni} already exists`,
          );
        }
      }
      throw new UnexpectedError('a unexpected situation ocurred');
    }
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}
