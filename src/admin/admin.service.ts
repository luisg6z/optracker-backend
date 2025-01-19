import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as bcrypt from 'bcrypt';
import {
  AlreadyExistsError,
  NotFoundError,
  UnexpectedError,
} from 'src/common/errors/service.errors';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createAdminDto: CreateAdminDto) {
    try {
      const hashedPassword = await bcrypt.hash(
        createAdminDto.password,
        Number(process.env.SALT_ROUNDS),
      );

      const admin = await this.prisma.administrator.create({
        data: {
          name: createAdminDto.name,
          lastName: createAdminDto.lastName,
          email: createAdminDto.email,
          password: hashedPassword,
        },
      });

      return admin;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `An administrator with the mail ${createAdminDto.email} already exists`,
          );
        }
      }
      throw new UnexpectedError(`an unexpected situation ocurred: ${error}`);
    }
  }

  async findAll() {
    return await this.prisma.administrator.findMany({
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
      },
    });
  }

  async findOneById(id: number) {
    try {
      return await this.prisma.administrator.findUniqueOrThrow({
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
          lastName: true,
          email: true,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `The administrator with the id ${id} was not found`,
          );
        }
      }
      throw new UnexpectedError('an unexpected situation ocurred');
    }
  }

  async findOneByEmail(email: string) {
    return await this.prisma.administrator.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    try {
      return await this.prisma.administrator.update({
        where: {
          id: id,
        },
        data: updateAdminDto,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `The administrator with the id ${id} was not found`,
          );
        }
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `An administrator with the email ${updateAdminDto.email} already exists`,
          );
        }
      }
      throw new UnexpectedError(error.message);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.administrator.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `The administrator with the id ${id} was not found`,
          );
        }
      }
      throw new UnexpectedError(`an unexpected situation ocurred`);
    }
  }

  async seed() {
    const hashedPassword = await bcrypt.hash(
      'optracker',
      Number(process.env.SALT_ROUNDS),
    );
    const admin = {
      name: 'Admin',
      lastName: 'User',
      email: 'admin@ucab.ve',
      password: hashedPassword,
    };

    await this.prisma.administrator.create({ data: admin });
  }
}
