import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  AlreadyExistsError,
  NotFoundError,
} from 'src/common/errors/service.errors';
import { CreateSurgeryDto } from './dto/create-surgery.dto';
import {
  UpdateStatusProcedureDTO,
  UpdateSurgeryDto,
} from './dto/update-surgery.dto';
import { SurgeryService } from './services/surgery.service';

@Controller('surgery')
export class SurgeryController {
  constructor(private readonly surgeryService: SurgeryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createSurgeryDto: CreateSurgeryDto) {
    try {
      return await this.surgeryService.create(createSurgeryDto);
    } catch (error) {
      if (error instanceof AlreadyExistsError) {
        throw new ConflictException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return this.surgeryService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    try {
      return await this.surgeryService.findOne(+id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id') id: string,
    @Body() updateSurgeryDto: UpdateSurgeryDto,
  ) {
    try {
      return await this.surgeryService.update(+id, updateSurgeryDto);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  @Patch('/procedure/status')
  @HttpCode(HttpStatus.CREATED)
  async updateStatusProcedure(
    @Body() updateSurgeryDto: UpdateStatusProcedureDTO,
  ) {
    try {
      return await this.surgeryService.updateProcedureStatus(updateSurgeryDto);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    try {
      return await this.surgeryService.remove(+id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
