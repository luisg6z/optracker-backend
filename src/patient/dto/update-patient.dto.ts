import { ApiProperty, PartialType } from '@nestjs/swagger';
import { BloodType, Gender } from '@prisma/client';
import {
  IsArray,
  IsDate,
  IsDecimal,
  IsEmail,
  IsEnum,
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
  @IsArray()
  alergies: string[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  birthDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsDecimal()
  weight: number;

  @ApiProperty()
  @IsOptional()
  @IsDecimal()
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
