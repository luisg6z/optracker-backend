import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSurgeryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  hour: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  status: Status;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  patientId: number;
}
