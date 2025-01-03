import { Injectable } from '@nestjs/common';
import { CreateNurseDto } from './dto/create-nurse.dto';
import { UpdateNurseDto } from './dto/update-nurse.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AlreadyExistsError, NotFoundError, UnexpectedError } from 'src/common/errors/service.errors';

@Injectable()
export class NurseService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createNurseDto: CreateNurseDto) {
    try {
      const hashedPassword = bcrypt.hash(
        createNurseDto.password,
        Number(process.env.SALT_ROUNDS)
      )
      return await this.prisma.nurse.create({
        data: {
          password: hashedPassword,
          ...createNurseDto,
        }
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new AlreadyExistsError(`A Nurse with the email ${createNurseDto.email} already exists`);
        }
      }
      throw new UnexpectedError("An unexpected error ocurred")
    }
  }

  async findAll() {
    return await this.prisma.nurse.findMany({
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
        speciality: true,
        licenseNumber: true,
        dea: true,
      }
    })
  }

  async findOne(id: number) {
    try {
      return await this.prisma.nurse.findUniqueOrThrow({
        where: {
          id: id
        },
        select: {
          id: true,
          name: true,
          lastName: true,
          email: true,
          speciality: true,
          licenseNumber: true,
          dea: true,
        }
      })
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(`A nurse with the id ${id} doesn't exists`);
        }
      }
      throw new UnexpectedError("a unexpected situation ocurred")
    };
  }

  async update(id: number, updateNurseDto: UpdateNurseDto) {
    try {
      return await this.prisma.nurse.update({
        where: {
          id: id
        },
        data: updateNurseDto
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(`A nurse with the id ${id} doesn't exists`);
        }
        if(error.code === "P2002") {
          throw new AlreadyExistsError(`A nurse with the email ${updateNurseDto.email} already exists`);
        }
      }
      throw new UnexpectedError("a unexpected situation ocurred")
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.nurse.delete({
        where: {
          id: id
        }
      })
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(`A nurse with the id ${id} doesn't exists`);
        }
      }
      throw new UnexpectedError("an unexpected situation ocurred")
    }
  }
}
