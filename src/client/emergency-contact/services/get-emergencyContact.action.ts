import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import {
  NotFoundError,
  UnexpectedError,
} from 'src/common/errors/service.errors';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GetEmergencyContactAction {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    return await this.prisma.emergencyContact.findMany({
      select: {
        id: true,
        dni: true,
        email: true,
        name: true,
        lastName: true,
        phoneNumber: true,
        patient: true,
      },
    });
  }

  async findOne(id: number) {
    try {
      return await this.prisma.emergencyContact.findUniqueOrThrow({
        where: {
          id: id,
        },
        select: {
          id: true,
          dni: true,
          email: true,
          name: true,
          lastName: true,
          phoneNumber: true,
          patient: true,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error?.code === 'P2025'
      ) {
        throw new NotFoundError(
          `An emergency contact with the id ${id} doesn't exists`,
        );
      }
      throw new UnexpectedError('a unexpected situation ocurred');
    }
  }

  async findOneByDNI(dni: string) {
    return await this.prisma.emergencyContact.findMany({
      where: {
        dni: dni,
      },
      select: {
        id: true,
        dni: true,
        email: true,
        name: true,
        lastName: true,
        phoneNumber: true,
        patient: true,
      },
    });
  }

  async findOneByEmail(email: string) {
    return await this.prisma.emergencyContact.findMany({
      where: {
        email: email,
      },
      select: {
        id: true,
        dni: true,
        email: true,
        name: true,
        lastName: true,
        phoneNumber: true,
        patient: true,
      },
    });
  }
}
