import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import {
  AlreadyExistsError,
  NotFoundError,
  UnexpectedError,
} from 'src/common/errors/service.errors';
import { PatientService } from 'src/patient/services/patient.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSurgeryDto } from '../dto/create-surgery.dto';
import { UpdateSurgeryDto } from '../dto/update-surgery.dto';
import { GetSurgeryAction } from './get-surgery.action';

@Injectable()
export class SurgeryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly patientService: PatientService,
    private readonly getSurgeryAction: GetSurgeryAction,
  ) {}

  async create(createSurgeryDto: CreateSurgeryDto) {
    try {
      const patientExists = await this.patientService.findOne(
        createSurgeryDto.patientId,
      );

      if (!patientExists) {
        throw new NotFoundError('Patient does not exists!');
      }

      return await this.prisma.surgery.create({
        data: {
          date: new Date(createSurgeryDto.date),
          ...createSurgeryDto,
        },
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
      if (error instanceof NotFoundError) {
        throw new NotFoundError(error.message);
      }
      throw new UnexpectedError('An unexpected error ocurred');
    }
  }

  async findAll() {
    return await this.getSurgeryAction.findAll();
  }

  async findOne(id: number) {
    return await this.patientService.findOne(id);
  }

  async update(id: number, updateSurgeryDto: UpdateSurgeryDto) {
    try {
      return await this.prisma.surgery.update({
        where: {
          id: id,
        },
        data: {
          date: new Date(updateSurgeryDto.date),
          ...updateSurgeryDto,
        },
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
      if (
        error instanceof PrismaClientKnownRequestError &&
        error?.code === 'P2025'
      ) {
        throw new NotFoundError(`Surgery with id ${id} not found`);
      }
      if (error instanceof NotFoundError) {
        throw new NotFoundError(error.message);
      }
      throw new UnexpectedError('An unexpected error ocurred');
    }
  }
}
