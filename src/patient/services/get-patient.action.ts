import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import {
  AlreadyExistsError,
  NotFoundError,
  UnexpectedError,
} from 'src/common/errors/service.errors';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePatientDto } from '../dto/create-patient.dto';

@Injectable()
export class GetPatientAction {
  constructor(private readonly prisma: PrismaService) {}

  async validatePatientExists(createPatientDto: CreatePatientDto) {
    let patientExists = await this.findOneByDNI(createPatientDto.dni);

    if (patientExists.length !== 0) {
      throw new AlreadyExistsError(
        `A patient with the dni ${createPatientDto.dni} already exists from the patientExists check`,
      );
    }
    patientExists = await this.findOneByEmail(createPatientDto.email);

    if (patientExists.length !== 0) {
      throw new AlreadyExistsError(
        `A patient with the email ${createPatientDto.email} already exists from the patientExists check`,
      );
    }
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

  private async findOneByDNI(dni: string) {
    return await this.prisma.patient.findMany({
      where: {
        dni: dni,
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
  }
  private async findOneByEmail(email: string) {
    return await this.prisma.patient.findMany({
      where: {
        email: email,
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
  }
}
