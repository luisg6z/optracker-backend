import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import {
  NotFoundError,
  UnexpectedError,
} from 'src/common/errors/service.errors';
import { PatientService } from 'src/patient/services/patient.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSurgeryDto } from '../dto/create-surgery.dto';
import { UpdateSurgeryDto } from '../dto/update-surgery.dto';
import { GetSurgeryAction } from './get-surgery.action';
import { PutSurgeryAction } from './put-surgery-action';

@Injectable()
export class SurgeryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly patientService: PatientService,
    private readonly getSurgeryAction: GetSurgeryAction,
    private readonly putSurgeryAction: PutSurgeryAction,
  ) {}

  async create(createSurgeryDto: CreateSurgeryDto) {
    return await this.putSurgeryAction.create(createSurgeryDto);
  }

  async findAll() {
    return await this.getSurgeryAction.findAll();
  }

  async findOne(id: number) {
    return await this.patientService.findOne(id);
  }

  async update(id: number, updateSurgeryDto: UpdateSurgeryDto) {
    return this.putSurgeryAction.update(id, updateSurgeryDto);
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
