import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import {
  NotFoundError,
  UnexpectedError,
} from 'src/common/errors/service.errors';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GetProcedureAction {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.procedure.findMany({
      where: {
        deleteAt: null,
      },
    });
  }

  async findOne(id: number) {
    try {
      return await this.prisma.procedure.findUniqueOrThrow({
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
          durationMinutes: true,
          durationHours: true,
          description: true,
          ProcedurePerSurgery: {
            select: {
              surgery: true,
            },
          },
          createAt: true,
          updateAt: true,
          deleteAt: true,
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

  async findOneToSoftDelete(id: number) {
    try {
      return await this.prisma.procedure.findMany({
        where: {
          AND: { id: id, deleteAt: { not: null } },
        },
        select: {
          name: true,
          description: true,
          durationMinutes: true,
          durationHours: true,
        },
      })[0];
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

  async findOneByName(name: string) {
    try {
      return await this.prisma.procedure.findMany({
        where: {
          name: name,
          deleteAt: null,
        },
        select: {
          id: true,
          name: true,
          durationMinutes: true,
          durationHours: true,
          description: true,
          ProcedurePerSurgery: {
            select: {
              surgery: true,
            },
          },
          createAt: true,
          updateAt: true,
          deleteAt: true,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error?.code === 'P2025'
      ) {
        throw new NotFoundError(
          `A Procedure with the name ${name} doesn't exists`,
        );
      }
      throw new UnexpectedError('a unexpected situation ocurred');
    }
  }
}
