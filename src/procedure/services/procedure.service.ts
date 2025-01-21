import { Injectable } from '@nestjs/common';
import {
  NotFoundError,
  UnexpectedError,
} from 'src/common/errors/service.errors';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProcedureDto } from '../dto/create-procedure.dto';
import { UpdateProcedureDto } from '../dto/update-procedure.dto';
import { GetProcedureAction } from './get-procedure.action';
import { PutProcedureAction } from './put-procedure.action';

@Injectable()
export class ProcedureService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly getProcedureAction: GetProcedureAction,
    private readonly putProcedureAction: PutProcedureAction,
  ) {}

  async create(createProcedureDto: CreateProcedureDto) {
    return await this.putProcedureAction.create(createProcedureDto);
  }

  async findAll() {
    return await this.getProcedureAction.findAll();
  }

  async findOne(id: number) {
    try {
      const procedure = await this.getProcedureAction.findOne(id);

      if (procedure.deleteAt) {
        throw new NotFoundError(`A procedure with the id ${id} doesn't exists`);
      }

      return procedure;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundError(error.message);
      }
      console.log(error.message);
      throw new UnexpectedError('An unexpected error ocurred');
    }
  }

  async update(id: number, updateProcedureDto: UpdateProcedureDto) {
    return await this.putProcedureAction.update(id, updateProcedureDto);
  }

  async remove(id: number) {
    return await this.putProcedureAction.softDelete(id);
  }
}
