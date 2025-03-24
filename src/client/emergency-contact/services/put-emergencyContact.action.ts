import { PatientService } from '@/client/patient/services/patient.service';
import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import {
  AlreadyExistsError,
  NotFoundError,
  UnexpectedError,
} from 'src/common/errors/service.errors';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmergencyContactDto } from '../dto/create-emergency-contact.dto';
import { UpdateEmergencyContactDto } from '../dto/update-emergency-contact.dto';
import { GetEmergencyContactAction } from './get-emergencyContact.action';

@Injectable()
export class PutEmergencyContactAction {
  constructor(
    private readonly patientService: PatientService,
    private readonly prisma: PrismaService,
    private readonly getEmergencyContact: GetEmergencyContactAction,
  ) {}

  private async validatePatient(id: number) {
    return await this.patientService.findOne(id);
  }

  private async validateEmergencyContactExists(
    createEmergencyContactDto: CreateEmergencyContactDto,
  ) {
    let contactExists = await this.getEmergencyContact.findOneByDNI(
      createEmergencyContactDto.dni,
    );

    if (contactExists.length !== 0) {
      throw new AlreadyExistsError(
        `An emergency contact with the dni ${createEmergencyContactDto.dni} already exists`,
      );
    }
    contactExists = await this.getEmergencyContact.findOneByEmail(
      createEmergencyContactDto.email,
    );

    if (contactExists.length !== 0) {
      throw new AlreadyExistsError(
        `An emergency contact with the dni ${createEmergencyContactDto.dni} already exists`,
      );
    }
  }

  async createEmergencyContact(
    createEmergencyContactDto: CreateEmergencyContactDto,
  ) {
    try {
      await this.validatePatient(createEmergencyContactDto.patientId);
      await this.validateEmergencyContactExists(createEmergencyContactDto);
      return await this.prisma.emergencyContact.create({
        data: createEmergencyContactDto,
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error?.code === 'P2002'
      ) {
        throw new AlreadyExistsError(
          `An emergency contact with the dni ${createEmergencyContactDto.dni} already exists`,
        );
      }
      if (error instanceof AlreadyExistsError) {
        throw new AlreadyExistsError(error.message);
      }
      throw new UnexpectedError('An unexpected error ocurred');
    }
  }

  async updateEmergencyContact(
    id: number,
    updateEmergencyContactDto: UpdateEmergencyContactDto,
  ) {
    try {
      return await this.prisma.emergencyContact.update({
        where: {
          id: id,
        },
        data: updateEmergencyContactDto,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `A emergency contact with the id ${id} doesn't exists`,
          );
        }
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `An emergency contact with the dni ${updateEmergencyContactDto.dni} already exists`,
          );
        }
      }
      throw new UnexpectedError('a unexpected situation ocurred');
    }
  }
}
