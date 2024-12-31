import { Injectable } from '@nestjs/common';
import { CreateNurseDto } from './dto/create-nurse.dto';
import { UpdateNurseDto } from './dto/update-nurse.dto';

@Injectable()
export class NurseService {
  create(createNurseDto: CreateNurseDto) {
    return 'This action adds a new nurse';
  }

  findAll() {
    return `This action returns all nurse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nurse`;
  }

  update(id: number, updateNurseDto: UpdateNurseDto) {
    return `This action updates a #${id} nurse`;
  }

  remove(id: number) {
    return `This action removes a #${id} nurse`;
  }
}
