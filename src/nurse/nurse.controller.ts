import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException, InternalServerErrorException, NotFoundException, HttpCode, HttpStatus } from '@nestjs/common';
import { NurseService } from './nurse.service';
import { CreateNurseDto } from './dto/create-nurse.dto';
import { UpdateNurseDto } from './dto/update-nurse.dto';
import { AlreadyExistsError, NotFoundError } from 'src/common/errors/service.errors';

@Controller('nurse')
export class NurseController {
  constructor(private readonly nurseService: NurseService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createNurseDto: CreateNurseDto) {
    try {
      return await this.nurseService.create(createNurseDto);
    } catch (error) {
      if (error instanceof AlreadyExistsError) {
        throw new ConflictException(error.message)
      }
      throw new InternalServerErrorException(error.message)
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.nurseService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    try {
      return await this.nurseService.findOne(+id);
    } catch (error) {
      if(error instanceof NotFoundError) {
        throw new NotFoundException(error.message)
      }
      throw new InternalServerErrorException(error.message)
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(@Param('id') id: string, @Body() updateNurseDto: UpdateNurseDto) {
    try {
      return await this.nurseService.update(+id, updateNurseDto);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message)
      }
      if (error instanceof AlreadyExistsError) {
        throw new ConflictException(error.message)
      }
      throw new InternalServerErrorException(error.message)
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    try {
      return await this.nurseService.remove(+id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message)
      }
      throw new InternalServerErrorException(error.message)
    }
  }
}
