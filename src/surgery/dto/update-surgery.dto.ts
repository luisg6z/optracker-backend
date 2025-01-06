import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import {
  IsDate,
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
  @IsDate()
  date: Date;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  hour: Date;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Status)
  status: Status;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  patientId: number;
}
