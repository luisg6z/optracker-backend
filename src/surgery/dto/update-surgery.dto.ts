import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateSurgeryDto } from './create-surgery.dto';

export class UpdateSurgeryDto extends PartialType(CreateSurgeryDto) {
  @ApiProperty()
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  date: Date;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Status)
  status: Status;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  patientId: number;
}
