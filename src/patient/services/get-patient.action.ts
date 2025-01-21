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

  async findAll() {
    return await this.prisma.patient.findMany({
      where: {
        deleteAt: null,
      },
      select: {
        id: true,
        familyCode: true,
        dni: true,
        name: true,
        lastName: true,
        email: true,
        alergies: true,
        birthDate: true,
        phoneNumber: true,
        bloodType: true,
        gender: true,
        height: true,
        weight: true,
        createAt: true,
        updateAt: true,
        EmergencyContact: true,
        Surgery: true,
        deleteAt: true,
      },
    });
  }

  async findOne(id: number) {
    try {
      return await this.prisma.patient.findUniqueOrThrow({
        where: {
          id: id,
          deleteAt: null,
        },
        select: {
          id: true,
          familyCode: true,
          dni: true,
          email: true,
          name: true,
          lastName: true,
          alergies: true,
          phoneNumber: true,
          birthDate: true,
          weight: true,
          height: true,
          gender: true,
          bloodType: true,
          createAt: true,
          updateAt: true,
          deleteAt: true,
          EmergencyContact: true,
          Surgery: {
            where: {
              deleteAt: null,
            },
            select: {
              date: true,
              title: true,
              DoctorSurgery: {
                select: {
                  doctor: true,
                },
              },
              NurseSurgery: {
                select: {
                  nurse: true,
                },
              },
            },
          },
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

  async findOneByUUID(uuid: string) {
    try {
      return await this.prisma.patient.findMany({
        where: {
          familyCode: {
            startsWith: uuid,
          },
          deleteAt: null,
        },
        select: {
          id: true,
          familyCode: true,
          dni: true,
          email: true,
          name: true,
          lastName: true,
          alergies: true,
          phoneNumber: true,
          birthDate: true,
          weight: true,
          height: true,
          gender: true,
          bloodType: true,
          createAt: true,
          updateAt: true,
          deleteAt: true,
          EmergencyContact: true,
          Surgery: {
            where: {
              deleteAt: null,
            },
            select: {
              date: true,
              title: true,
              DoctorSurgery: {
                select: {
                  doctor: true,
                },
              },
              NurseSurgery: {
                select: {
                  nurse: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error?.code === 'P2025'
      ) {
        throw new NotFoundError(`A patient with the id ${uuid} doesn't exists`);
      }
      throw new UnexpectedError('a unexpected situation ocurred');
    }
  }

  async findOneToSoftDelete(id: number) {
    try {
      console.log(id);
      return await this.prisma.patient.findMany({
        where: {
          AND: { id: id, deleteAt: { not: null } },
        },
        select: {
          dni: true,
          email: true,
          name: true,
          lastName: true,
          alergies: true,
          phoneNumber: true,
          birthDate: true,
          weight: true,
          height: true,
          gender: true,
          bloodType: true,
          deleteAt: true,
        },
      })[0];
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error?.code === 'P2025'
      ) {
        throw new NotFoundError(`A patient with the id ${id} doesn't exists`);
      }
      console.log(error.message);
      throw new UnexpectedError('a unexpected situation ocurred');
    }
  }

  async findOneWithEmergencyContact(id: number) {
    try {
      return await this.prisma.patient.findUniqueOrThrow({
        where: {
          id: id,
          deleteAt: null,
        },
        select: {
          id: true,
          dni: true,
          name: true,
          lastName: true,
          email: true,
          alergies: true,
          birthDate: true,
          phoneNumber: true,
          bloodType: true,
          gender: true,
          height: true,
          weight: true,
          EmergencyContact: true,
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

  async findOneWithSurgicalHistory(id: number) {
    try {
      return await this.prisma.patient.findUniqueOrThrow({
        where: {
          id: id,
          deleteAt: null,
        },
        select: {
          id: true,
          dni: true,
          name: true,
          lastName: true,
          email: true,
          alergies: true,
          birthDate: true,
          phoneNumber: true,
          bloodType: true,
          gender: true,
          height: true,
          weight: true,
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
        alergies: true,
        birthDate: true,
        phoneNumber: true,
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
        alergies: true,
        birthDate: true,
        phoneNumber: true,
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
