import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateSurgeryDto } from './dto/create-surgery.dto';
import { UpdateSurgeryDto } from './dto/update-surgery.dto';
import { SurgeryService } from './services/surgery.service';

@Controller('surgery')
export class SurgeryController {
  constructor(private readonly surgeryService: SurgeryService) {}

  @Post()
  create(@Body() createSurgeryDto: CreateSurgeryDto) {
    return this.surgeryService.create(createSurgeryDto);
  }

  @Get()
  findAll() {
    return this.surgeryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.surgeryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSurgeryDto: UpdateSurgeryDto) {
    return this.surgeryService.update(+id, updateSurgeryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.surgeryService.remove(+id);
  }
}
