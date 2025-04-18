import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import {
  AlreadyExistsError,
  NotFoundError,
  UnexpectedError,
} from 'src/common/errors/service.errors';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { UpdatePatientDto } from '../dto/update-patient.dto';
import { GetPatientAction } from './get-patient.action';
import { UUIDService } from './UUID.service';

@Injectable()
export class PatientService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly getPatient: GetPatientAction,
    private readonly uuidGenerator: UUIDService,
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    try {
      // take to other function for better validation
      await this.getPatient.validatePatientExists(createPatientDto);
      const uniqueCode = this.uuidGenerator.generate();

      return await this.prisma.patient.create({
        data: {
          birthDate: new Date(createPatientDto.birthDate).toISOString(),
          familyCode: uniqueCode,
          ...createPatientDto,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error?.code === 'P2002'
      ) {
        throw new AlreadyExistsError(
          `A Patient with the dni ${createPatientDto.dni} or email ${createPatientDto.email} already exists`,
        );
      }
      if (error instanceof AlreadyExistsError) {
        throw new AlreadyExistsError(error.message);
      }
      throw new UnexpectedError(`An unexpected error ocurred`);
    }
  }

  // ? See the output of EmergencyContact and Surgery
  // ! Make endpoints for getting the information of it's contacts and surgical history
  async findAll() {
    const patients = await this.getPatient.findAll();
    patients.map((value) => {
      value.familyCode = value.familyCode.substring(0, 5);
    });
    return patients;
  }

  async findOne(id: number) {
    try {
      const patient = await this.getPatient.findOne(id);
      patient.familyCode = patient.familyCode.substring(0, 5);
      return patient;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error?.code === 'P2025'
      ) {
        throw new NotFoundError(`A patient with the id ${id} doesn't exists`);
      }
      throw new UnexpectedError('a unexpected situation ocurred');
    }
  }

  async findOneByUUID(uuid: string) {
    try {
      const patient = await this.getPatient.findOneByUUID(uuid);
      patient.map((value) => {
        value.familyCode = value.familyCode.substring(0, 5);
      });
      return patient;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error?.code === 'P2025'
      ) {
        throw new NotFoundError(`A patient with the id ${uuid} doesn't exists`);
      }
      throw new UnexpectedError('a unexpected situation ocurred');
    }
  }

  async findOneWithEmergencyContact(id: number) {
    return await this.getPatient.findOneWithEmergencyContact(id);
  }

  async findOneWithSurgicalHistory(id: number) {
    return await this.getPatient.findOneWithSurgicalHistory(id);
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    try {
      return await this.prisma.patient.update({
        where: {
          id: id,
        },
        data: updatePatientDto,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(`A patient with the id ${id} doesn't exists`);
        }
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `A patient with the dni ${updatePatientDto.dni} already exists`,
          );
        }
      }
      throw new UnexpectedError('a unexpected situation ocurred');
    }
  }

  async remove(id: number) {
    try {
      const patient = await this.getPatient.findOneToSoftDelete(id);

      if (!patient) {
        throw new NotFoundError(`A patient with the id ${id} doesn't exists`);
      }

      return await this.prisma.patient.update({
        where: {
          id: id,
        },
        data: {
          deleteAt: new Date(),
          ...patient,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(`A patient with the id ${id} doesn't exists`);
        }
      }
      if (error instanceof NotFoundError) {
        throw new NotFoundError(error.message);
      }
      throw new UnexpectedError('a unexpected situation ocurred');
    }
  }
}
