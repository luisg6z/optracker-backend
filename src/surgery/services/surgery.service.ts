import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import {
  AlreadyExistsError,
  UnexpectedError,
} from 'src/common/errors/service.errors';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSurgeryDto } from '../dto/create-surgery.dto';
import { UpdateSurgeryDto } from '../dto/update-surgery.dto';

@Injectable()
export class SurgeryService {
  constructor(private readonly prisma: PrismaService) {}

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

  findAll() {
    return `This action returns all surgery`;
  }

  findOne(id: number) {
    return `This action returns a #${id} surgery`;
  }

  update(id: number, updateSurgeryDto: UpdateSurgeryDto) {
    return `This action updates a #${id} surgery`;
  }

  remove(id: number) {
    return `This action removes a #${id} surgery`;
  }
}
