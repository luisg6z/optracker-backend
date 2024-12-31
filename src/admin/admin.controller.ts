import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException, InternalServerErrorException, NotFoundException, HttpStatus, HttpCode } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AlreadyExistsError, NotFoundError } from 'src/common/errors/service.errors';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createAdminDto: CreateAdminDto) {
    try {
      return await this.adminService.create(createAdminDto);
    } catch (error) {
      if(error instanceof AlreadyExistsError){
        throw new ConflictException(error.message)
      }
      throw new InternalServerErrorException(error.message)
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.adminService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    try {
      return await this.adminService.findOne(+id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message)
      }
      throw new InternalServerErrorException(error.message)
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    try {
      return await this.adminService.update(+id, updateAdminDto);
    } catch (error) {
      if(error instanceof NotFoundError){
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
      return await this.adminService.remove(+id);
    } catch (error) {
      if(error instanceof NotFoundError){
        throw new NotFoundException(error.message)
      }
      throw new InternalServerErrorException(error.message)
    }
  }
}
