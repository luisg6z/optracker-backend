import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import {
  AlreadyExistsError,
  UnexpectedError,
  NotFoundError,
} from 'src/common/errors/service.errors';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSurgeryDto } from '../dto/create-surgery.dto';
import { UpdateSurgeryDto } from '../dto/update-surgery.dto';

@Injectable()
export class SurgeryService {
  constructor(private readonly prisma: PrismaService) { }
  
  async create(createSurgeryDto: CreateSurgeryDto) {
    try {
      return await this.prisma.surgery.create({
        data: createSurgeryDto,
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error?.code === 'P2002'
      ) {
        throw new AlreadyExistsError(
          `A Doctor with the dni ${createSurgeryDto} already exists`,
        );
      }
      if (error instanceof AlreadyExistsError) {
        throw new AlreadyExistsError(error.message);
      }
      throw new UnexpectedError('An unexpected error ocurred');
    }
  }

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
      return await this.prisma.surgery.findUnique({
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
      if (error instanceof PrismaClientKnownRequestError && error?.code === 'P2025') {
        throw new NotFoundError(`Surgery with id ${id} not found`);
      }
      if (error instanceof NotFoundError) {
        throw new NotFoundError(error.message);
      }
      throw new UnexpectedError('An unexpected error ocurred');
    }
  }

  async update(id: number, updateSurgeryDto: UpdateSurgeryDto) {
    try {
      return await this.prisma.surgery.update({
        where: {
          id: id,
        },
        data: updateSurgeryDto,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(`Surgery with id ${id} not found`);
        }
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(`Surgery with id ${id} already exists`);
        }
      }
      if (error instanceof NotFoundError) {
        throw new NotFoundError(error.message);
      }
      throw new UnexpectedError('An unexpected error ocurred');
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.surgery.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error?.code === 'P2025') {
        throw new NotFoundError(`Surgery with id ${id} not found`);
      }
      if (error instanceof NotFoundError) {
        throw new NotFoundError(error.message);
      }
      throw new UnexpectedError('An unexpected error ocurred');
    }
  }
}
