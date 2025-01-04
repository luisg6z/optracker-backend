import { ApiProperty } from '@nestjs/swagger';
import { BloodType, Gender } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreatePatientDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  dni: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  height: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(BloodType)
  bloodType: BloodType;
}
