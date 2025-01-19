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
    const grades = [
      'Cirujanos generales',
      'Cirujanos cardiovasculares',
      'Cirujanos ortopédicos',
      'Neurocirujanos',
      'Cirujanos plásticos',
      'Cirujanos pediátricos',
      'Cirujanos torácicos',
      'Cirujanos vasculares',
      'Cirujanos maxilofaciales',
      'Cirujanos de trasplantes',
      'Cirujanos urológicos',
      'Cirujanos ginecológicos',
      'Cirujanos oncólogos',
      'Cirujanos otorrinolaringólogos',
      'Cirujanos oftalmólogos',
      'Anestesiólogos',
      'Enfermeros de quirófano',
      'Enfermeros instrumentistas',
      'Enfermeros circulantes',
      'Enfermeros anestesistas',
      'Enfermeros de recuperación',
      'Enfermeros de cuidados intensivos',
      'Enfermeros de quirófano',
      'Ayudan durante la cirugía directamente',
      'Enfermeros instrumentistas',
      'Manejan los instrumentos quirúrgicos',
      'Enfermeros circulantes',
      'Supervisan y asisten desde fuera del campo estéril',
      'Enfermeros anestesistas',
      'Colaboran con los anestesiólogos en la administración de anestesia',
      'Enfermeros de recuperación',
      'Monitorean al paciente tras la cirugía en el área de recuperación',
      'Enfermeros de cuidados intensivos',
      'Asisten a pacientes críticos en el pre o postoperatorio',
      'Enfermeros generales',
      'Atienden diferentes tareas básicas, como cuidado general y apoyo en el quirófano',
      'Enfermeros administrativos',
      'Encargados de gestionar documentos clínicos, registro de pacientes y organización general',
      'Enfermeros de esterilización',
      'Se aseguran de que todos los equipos e instrumentos estén debidamente esterilizados',
      'Enfermeros de triage',
      'Evalúan a los pacientes y priorizan su atención según la urgencia',
    ];
    const education = [];

    grades.forEach((value) => {
      education.push({
        institutionName: value,
      });
    });

    await this.prisma.education.createMany({ data: education });
  }
}
