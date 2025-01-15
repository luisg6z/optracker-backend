import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import {
  AlreadyExistsError,
  NotFoundError,
  UnexpectedError,
} from 'src/common/errors/service.errors';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProcedureDto } from '../dto/create-procedure.dto';
import { UpdateProcedureDto } from '../dto/update-procedure.dto';
import { GetProcedureAction } from './get-procedure.action';

@Injectable()
export class PutProcedureAction {
  constructor(
    private readonly prisma: PrismaService,
    private readonly getProcedureAction: GetProcedureAction,
  ) {}

  timeValidation(hoursParam: number, minutes: number) {
    if (hoursParam >= 24) {
      throw new BadRequestException(`Hours cannot be more than 24`);
    }

    if (minutes >= 60) {
      const hours = Math.trunc(hoursParam / 60);
      minutes -= 60 * hours;
      hoursParam += hours;
      if (hours >= 24) {
        throw new BadRequestException(`Hours cannot be more than 24`);
      }
    }

    return {
      hours: hoursParam,
      minutes: minutes,
    };
  }

  async create(createProcedureDto: CreateProcedureDto) {
    try {
      const procedureExists = await this.getProcedureAction.findOneByName(
        createProcedureDto.name,
      );
      if (procedureExists.length !== 0) {
        throw new AlreadyExistsError(
          `A procedure with the name ${createProcedureDto.name} already exists`,
        );
      }

      const { hours, minutes } = this.timeValidation(
        createProcedureDto.durationHours,
        createProcedureDto.durationMinutes,
      );
      createProcedureDto.durationHours = hours;
      createProcedureDto.durationMinutes = minutes;
      return await this.prisma.procedure.create({
        data: createProcedureDto,
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error?.code === 'P2002'
      ) {
        throw new AlreadyExistsError(
          `A procedure with the name ${createProcedureDto.name} already exists`,
        );
      }
      if (error instanceof AlreadyExistsError) {
        throw new AlreadyExistsError(error.message);
      }
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw new UnexpectedError('An unexpected error ocurred');
    }
  }

  async update(id: number, updateDoctorDto: UpdateProcedureDto) {
    try {
      const { hours, minutes } = this.timeValidation(
        updateDoctorDto.durationHours,
        updateDoctorDto.durationMinutes,
      );
      updateDoctorDto.durationHours = hours;
      updateDoctorDto.durationMinutes = minutes;
      return await this.prisma.procedure.update({
        where: {
          id: id,
        },
        data: updateDoctorDto,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(`A doctor with the id ${id} doesn't exists`);
        }
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `A doctor with the name ${updateDoctorDto.name} already exists`,
          );
        }
      }
      throw new UnexpectedError('a unexpected situation ocurred');
    }
  }

  async softDelete(id: number) {
    try {
      const procedure = await this.getProcedureAction.findOneToSoftDelete(id);

      if (!procedure) {
        throw new NotFoundError(`A patient with the id ${id} doesn't exists`);
      }

      return await this.prisma.procedure.update({
        where: {
          id: id,
        },
        data: {
          deleteAt: new Date(),
          ...procedure,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `A procedure with the id ${id} doesn't exists`,
          );
        }
      }
      if (error instanceof NotFoundError) {
        throw new NotFoundError(error.message);
      }
      throw new UnexpectedError('a unexpected situation ocurred');
    }
  }
}
