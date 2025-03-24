import { ApiProperty } from '@nestjs/swagger';
import { BloodType, Gender } from '@prisma/client';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreatePatientDto {
  @ApiProperty({
    type: String,
    description: 'Documento de identidad del paciente que se está registrando',
  })
  @IsNotEmpty()
  @IsString()
  dni: string;

  @ApiProperty({ type: String, description: 'Correo electrónico del paciente' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, description: 'Nombre del paciente' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: String, description: 'Apellido del paciente' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    type: String,
    description: 'Descripción de las alergias que posee el paciente',
  })
  @IsNotEmpty()
  @IsString()
  alergies: string;

  @ApiProperty({ type: String, description: 'Número de teléfono del paciente' })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    type: Date,
    description:
      'Fecha de nacimiento del paciente que será usado para el cálculo de su edad',
  })
  @IsNotEmpty()
  @IsDateString()
  birthDate: Date;

  @ApiProperty({ type: Number, description: 'Peso del paciente' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  weight: number;

  @ApiProperty({ type: Number, description: 'Altura del paciente' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  height: number;

  @ApiProperty({
    enum: Gender,
    description: 'Género del paciente',
    enumName: 'Género',
  })
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({
    description: 'Tipo de sangre del paciente',
    enum: BloodType,
    enumName: 'Tipo de sangre',
  })
  @IsNotEmpty()
  @IsEnum(BloodType)
  bloodType: BloodType;
}
