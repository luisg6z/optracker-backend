import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import {
  NotFoundError,
  UnexpectedError,
} from 'src/common/errors/service.errors';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmergencyContactDto } from '../dto/create-emergency-contact.dto';
import { UpdateEmergencyContactDto } from '../dto/update-emergency-contact.dto';
import { GetEmergencyContactAction } from './get-emergencyContact.action';
import { PutEmergencyContactAction } from './put-emergencyContact.action';

@Injectable()
export class EmergencyContactService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly putEmergencyContact: PutEmergencyContactAction,
    private readonly getEmergencyContact: GetEmergencyContactAction,
  ) {}

  async create(createEmergencyContactDto: CreateEmergencyContactDto) {
    this.putEmergencyContact.createEmergencyContact(createEmergencyContactDto);
  }

  async findAll() {
    await this.getEmergencyContact.findAll();
  }

  async findOne(id: number) {
    await this.getEmergencyContact.findOne(id);
  }

  async findOneByDNI(dni: string) {
    await this.getEmergencyContact.findOneByDNI(dni);
  }

  async update(
    id: number,
    updateEmergencyContactDto: UpdateEmergencyContactDto,
  ) {
    await this.putEmergencyContact.updateEmergencyContact(
      id,
      updateEmergencyContactDto,
    );
  }

  async remove(id: number) {
    try {
      return await this.prisma.emergencyContact.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error?.code === 'P2025'
      ) {
        throw new NotFoundError(
          `An emergency contact with the id ${id} doesn't exists`,
        );
      }
      throw new UnexpectedError('An unexpected situation ocurred');
    }
  }
}
