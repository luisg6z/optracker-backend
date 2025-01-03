import { ApiProperty } from '@nestjs/swagger';
import { BloodType, Gender } from '@prisma/client';
import {
  IsDecimal,
  IsEmail,
  IsEnum,
  IsNotEmpty,
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
  @IsDecimal()
  weight: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDecimal()
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
