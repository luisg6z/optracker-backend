import { ApiProperty, PartialType } from '@nestjs/swagger';
import { BloodType, Gender } from '@prisma/client';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreatePatientDto } from './create-patient.dto';

export class UpdatePatientDto extends PartialType(CreatePatientDto) {
  @ApiProperty()
  @IsOptional()
  @IsString()
  dni: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  alergies: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  birthDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  weight: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  height: number;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty()
  @IsOptional()
  @IsEnum(BloodType)
  bloodType: BloodType;
}
