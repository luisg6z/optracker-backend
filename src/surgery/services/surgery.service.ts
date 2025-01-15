import { Injectable } from '@nestjs/common';
import {
  NotFoundError,
  UnexpectedError,
} from 'src/common/errors/service.errors';
import { PatientService } from 'src/patient/services/patient.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSurgeryDto } from '../dto/create-surgery.dto';
import { UpdateSurgeryDto } from '../dto/update-surgery.dto';
import { GetSurgeryAction } from './get-surgery.action';
import { PutSurgeryAction } from './put-surgery.action';

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
    try {
      const surgery = await this.getSurgeryAction.findOne(id);

      if (surgery.deleteAt) {
        throw new NotFoundError(`A surgery with the id ${id} doesn't exists`);
      }

      return surgery;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundError(error.message);
      }
      throw new UnexpectedError('An unexpected error ocurred');
    }
  }

  async update(id: number, updateSurgeryDto: UpdateSurgeryDto) {
    return await this.putSurgeryAction.update(id, updateSurgeryDto);
  }

  async remove(id: number) {
    return await this.putSurgeryAction.softDelete(id);
  }
}
