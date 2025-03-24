import { PatientService } from '@/client/patient/services/patient.service';
import { ProcedureService } from '@/medProcedure/procedure/services/procedure.service';
import { DoctorService } from '@/medTeam/doctor/doctor.service';
import { NurseService } from '@/medTeam/nurse/nurse.service';
import { Injectable } from '@nestjs/common';
import { Status } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import {
  AlreadyExistsError,
  NotFoundError,
  UnexpectedError,
} from 'src/common/errors/service.errors';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSurgeryDto } from '../dto/create-surgery.dto';
import {
  UpdateStatusProcedureDTO,
  UpdateSurgeryDto,
} from '../dto/update-surgery.dto';
import { GetSurgeryAction } from './get-surgery.action';

@Injectable()
export class PutSurgeryAction {
  constructor(
    private readonly prisma: PrismaService,
    private readonly patientService: PatientService,
    private readonly doctorService: DoctorService,
    private readonly nurseService: NurseService,
    private readonly procedureService: ProcedureService,
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

      const doctorsSurgery = [];
      for (const value of createSurgeryDto.doctorIds) {
        if (!(await this.doctorService.findOne(value))) {
          throw new NotFoundError('Doctor does not exists!');
        }
        doctorsSurgery.push({
          doctorId: value,
        });
      }

      const nursesSurgery = [];
      for (const value of createSurgeryDto.nurseIds) {
        if (!(await this.nurseService.findOnebyId(value))) {
          throw new NotFoundError('Nurse does not exists!');
        }
        nursesSurgery.push({
          nurseId: value,
        });
      }

      const proceduresSurgery = [];
      for (const value of createSurgeryDto.procedureIds) {
        if (!(await this.procedureService.findOne(value))) {
          throw new NotFoundError('Procedure does not exists!');
        }
        proceduresSurgery.push({
          procedureId: value,
        });
      }

      const response = await this.prisma.surgery.create({
        data: {
          date: new Date(createSurgeryDto.date),
          title: createSurgeryDto.title,
          status: createSurgeryDto.status,
          patientId: createSurgeryDto.patientId,
          DoctorSurgery: {
            create: doctorsSurgery,
          },
          NurseSurgery: {
            create: nursesSurgery,
          },
          ProcedurePerSurgery: {
            create: proceduresSurgery,
          },
        },
      });

      return response;
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
      console.log(error.message);
      throw new UnexpectedError('An unexpected error ocurred');
    }
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

  async updateProcedureStatus(updateDto: UpdateStatusProcedureDTO) {
    try {
      const updatedProcedure = await this.prisma.procedurePerSurgery.update({
        where: {
          surgeryId_procedureId: {
            procedureId: updateDto.procedureId,
            surgeryId: updateDto.surgeryId,
          },
        },
        data: {
          done: updateDto.done,
        },
      });

      const proceduresFromSurgery = await this.prisma.surgery.findUnique({
        where: {
          id: updateDto.surgeryId,
        },
        select: {
          ProcedurePerSurgery: {
            select: {
              procedureId: true,
              done: true,
            },
          },
        },
      });

      if (
        proceduresFromSurgery.ProcedurePerSurgery.some(
          (procedure) => procedure.done,
        )
      ) {
        await this.prisma.surgery.update({
          where: {
            id: updateDto.surgeryId,
          },
          data: {
            status: Status.IN_PROGRESS,
          },
        });
      }

      if (
        proceduresFromSurgery.ProcedurePerSurgery.every(
          (procedure) => procedure.done,
        )
      ) {
        await this.prisma.surgery.update({
          where: {
            id: updateDto.surgeryId,
          },
          data: {
            status: Status.DONE,
          },
        });
      }

      return updatedProcedure;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(`Surgery not found`);
        }
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(`Surgery already exists`);
        }
      }
      if (error instanceof NotFoundError) {
        throw new NotFoundError(error.message);
      }
      throw new UnexpectedError('An unexpected error ocurred');
    }
  }

  async softDelete(id: number) {
    try {
      const { deleteAt, ...surgery } =
        await this.getSurgeryAction.findOneToSoftDelete(id);

      if (deleteAt) {
        throw new NotFoundError(`A surgery with the id ${id} doesn't exists`);
      }

      return await this.prisma.surgery.update({
        where: {
          id: id,
        },
        data: {
          date: new Date(surgery.date),
          deleteAt: new Date(),
          ...surgery,
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
      console.log(error.message);
      throw new UnexpectedError('An unexpected error ocurred');
    }
  }
}
