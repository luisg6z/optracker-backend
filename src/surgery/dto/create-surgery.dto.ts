import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
  @IsString()
  status: Status;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  patientId: number;
}
