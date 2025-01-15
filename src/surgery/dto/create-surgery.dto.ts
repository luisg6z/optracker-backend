import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateSurgeryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  patientId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  nurseIds: number[];

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  doctorIds: number[];

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  procedureIds: number[];
}
