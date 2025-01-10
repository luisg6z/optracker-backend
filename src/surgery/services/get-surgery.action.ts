import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NotFoundError } from 'rxjs';
import { UnexpectedError } from 'src/common/errors/service.errors';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GetSurgeryAction {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.surgery.findMany({
      select: {
        title: true,
        date: true,
        status: true,
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
          title: true,
          date: true,
          status: true,
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

  async findOneWithMedicalTeam(id: number) {
    try {
      return await this.prisma.surgery.findUniqueOrThrow({
        where: {
          id: id,
        },
        select: {
          title: true,
          date: true,
          status: true,
          DoctorSurgery: true,
          NurseSurgery: true,
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
}
