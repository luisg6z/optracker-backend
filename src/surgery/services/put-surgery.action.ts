import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import {
  AlreadyExistsError,
  NotFoundError,
  UnexpectedError,
} from 'src/common/errors/service.errors';
import { DoctorService } from 'src/doctor/doctor.service';
import { NurseService } from 'src/nurse/nurse.service';
import { PatientService } from 'src/patient/services/patient.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProcedureService } from 'src/procedure/services/procedure.service';
import { CreateSurgeryDto } from '../dto/create-surgery.dto';
import { UpdateSurgeryDto } from '../dto/update-surgery.dto';
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
