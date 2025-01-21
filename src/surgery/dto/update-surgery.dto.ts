import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
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

  @ApiProperty()
  @IsOptional()
  @IsNumber({}, { each: true })
  nurseIds: number[];

  @ApiProperty()
  @IsOptional()
  @IsNumber({}, { each: true })
  doctorIds: number[];

  @ApiProperty()
  @IsOptional()
  @IsNumber({}, { each: true })
  procedureIds: number[];
}

export class UpdateStatusProcedureDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  surgeryId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  procedureId: number;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  done: boolean;
}
