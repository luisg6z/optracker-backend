import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateNurseDto {
  @ApiProperty({ type: String, description: 'email del enfermero' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, description: 'nombres del enfermero' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: String, description: 'apellidos del enfermero' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ type: String, description: 'contraseña del enfermero' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ type: String, description: 'especialidad del enfermero' })
  @IsNotEmpty()
  @IsString()
  speciality: string;

  @ApiProperty({
    type: String,
    description: 'número de licencia del enfermero',
  })
  @IsNotEmpty()
  @IsString()
  licenseNumber: string;

  @ApiProperty({ type: String, description: 'Número de DEA del enfermero' })
  @IsNotEmpty()
  @IsString()
  dea: string;

  @ApiProperty({ type: String, description: 'DNI del enfermero' })
  @IsNotEmpty()
  @IsString()
  dni: string;

  @ApiProperty({
    type: String,
    description: 'Educación del enfermero',
    isArray: true,
  })
  @IsNotEmpty()
  @IsString({ each: true })
  educationIds: string[];
}
