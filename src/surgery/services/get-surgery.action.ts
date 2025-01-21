import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import {
  NotFoundError,
  UnexpectedError,
} from 'src/common/errors/service.errors';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GetSurgeryAction {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.surgery.findMany({
      where: {
        deleteAt: null,
      },
      select: {
        id: true,
        title: true,
        date: true,
        status: true,
        Patient: true,
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
        ProcedurePerSurgery: {
          select: {
            procedure: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    try {
      return await this.prisma.surgery.findUniqueOrThrow({
        where: {
          id: id,
        },
        select: {
          id: true,
          title: true,
          date: true,
          status: true,
          patientId: true,
          Patient: true,
          createAt: true,
          updateAt: true,
          deleteAt: true,
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
          ProcedurePerSurgery: {
            select: {
              procedure: true,
            },
          },
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error?.code === 'P2025'
      ) {
        throw new NotFoundError(`Surgery with id ${id} not found`);
      }
      throw new UnexpectedError('An unexpected error ocurred');
    }
  }

  async findOneToSoftDelete(id: number) {
    try {
      return await this.prisma.surgery.findUniqueOrThrow({
        where: {
          id: id,
        },
        select: {
          title: true,
          date: true,
          status: true,
          patientId: true,
          deleteAt: true,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error?.code === 'P2025'
      ) {
        throw new NotFoundError(`Surgery with id ${id} not found`);
      }
      throw new UnexpectedError('An unexpected error ocurred');
    }
  }

  async findProcedurePerSurgery(inputIds: {
    surgeryId: number;
    procedureId: number;
  }) {
    try {
      return await this.prisma.procedurePerSurgery.findUniqueOrThrow({
        where: {
          surgeryId_procedureId: inputIds,
        },
        select: {
          done: true,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error?.code === 'P2025'
      ) {
        throw new NotFoundError(`Surgery not found`);
      }
      throw new UnexpectedError('An unexpected error ocurred');
    }
  }
}
