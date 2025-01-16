import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import {
  AlreadyExistsError,
  NotFoundError,
  UnexpectedError,
} from 'src/common/errors/service.errors';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';

@Injectable()
export class EducationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEducationDto: CreateEducationDto) {
    try {
      const educationExists = await this.findOneByName(
        createEducationDto.institutionName,
      );

      if (educationExists) {
        throw new AlreadyExistsError(
          `A Education Center with the name ${createEducationDto.institutionName} already exists`,
        );
      }

      return await this.prisma.education.create({ data: createEducationDto });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error?.code === 'P2002'
      ) {
        throw new AlreadyExistsError(
          `A Education Center with the name ${createEducationDto.institutionName} already exists`,
        );
      }
      if (error instanceof AlreadyExistsError) {
        throw new AlreadyExistsError(error.message);
      }
      throw new UnexpectedError('An unexpected error ocurred');
    }
  }

  async findAll() {
    return await this.prisma.education.findMany({
      select: {
        id: true,
        institutionName: true,
      },
    });
  }

  async findOne(id: number) {
    try {
      return await this.prisma.education.findUniqueOrThrow({
        where: {
          id: id,
        },
        select: {
          id: true,
          institutionName: true,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error?.code === 'P2025'
      ) {
        throw new NotFoundError(
          `A education center with the id ${id} doesn't exists`,
        );
      }
      throw new UnexpectedError('a unexpected situation ocurred');
    }
  }

  async findOneByName(name: string) {
    try {
      return await this.prisma.education.findUnique({
        where: {
          institutionName: name,
        },
        select: {
          id: true,
          institutionName: true,
        },
      });
    } catch (error) {}
  }

  async update(id: number, updateEducationDto: UpdateEducationDto) {
    try {
      return await this.prisma.education.update({
        where: {
          id: id,
        },
        data: updateEducationDto,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `A education center with the id ${id} doesn't exists`,
          );
        }
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `A education center with the name ${updateEducationDto.institutionName} already exists`,
          );
        }
      }
      throw new UnexpectedError('a unexpected situation ocurred');
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.education.delete({
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
          `A education center with the id ${id} doesn't exists`,
        );
      }
      throw new UnexpectedError('An unexpected situation ocurred');
    }
  }

  async seed() {
    const grades = ['Oncología', 'Cardiología', 'Radiología'];
    const education = [];

    grades.forEach((value) => {
      education.push({
        institutionName: value,
      });
    });

    await this.prisma.education.createMany({ data: education });
  }
}
