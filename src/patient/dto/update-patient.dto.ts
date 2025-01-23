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
  @ApiProperty({ type: String, description: 'Documento de identidad del paciente que se está registrando' })
  @IsOptional()
  @IsString()
  dni: string;

  @ApiProperty({ type: String, description: 'Correo electrónico del paciente' })
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, description: 'Nombre del paciente' })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ type: String, description: 'Apellido del paciente' })
  @IsOptional()
  @IsString()
  lastName: string;

  @ApiProperty({ type: String, description: 'Descripción de las alergias que posee el paciente' })
  @IsOptional()
  @IsString()
  alergies: string;

  @ApiProperty({ type: String, description: 'Número de teléfono del paciente' })
  @IsOptional()
  @IsString()
  phoneNumber: string;

  @ApiProperty({ type: Date, description: 'Fecha de nacimiento del paciente que será usado para el cálculo de su edad' })
  @IsOptional()
  @IsDateString()
  birthDate: Date;

  @ApiProperty({ type: Number, description: 'Peso del paciente' })
  @IsOptional()
  @IsNumber()
  weight: number;

  @ApiProperty({ type: Number, description: 'Altura del paciente' })
  @IsOptional()
  @IsNumber()
  height: number;

  @ApiProperty({ enum: Gender, description: 'Género del paciente', enumName: 'Género' })
  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({ description: 'Tipo de sangre del paciente', enum: BloodType, enumName: 'Tipo de sangre' })
  @IsOptional()
  @IsEnum(BloodType)
  bloodType: BloodType;
}
