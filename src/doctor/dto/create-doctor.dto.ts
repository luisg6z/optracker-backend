import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDoctorDto {
  @ApiProperty({type: String, description: "Nombres del doctor"})
  @IsNotEmpty()
  @IsString()
  names: string;

  @ApiProperty({type: String, description: "Apellidos del doctor"})
  @IsNotEmpty()
  @IsString()
  lastNames: string;

  @ApiProperty({type: String, description: "Especialidad del doctor"})
  @IsNotEmpty()
  @IsString()
  speciality: string;

  @ApiProperty({type: String, description: "Número de Licencia del doctor"})
  @IsNotEmpty()
  @IsString()
  licenseNumber: string;

  @ApiProperty({type: String, description: "DNI del doctor"})
  @IsNotEmpty()
  @IsString()
  dni: string;

  @ApiProperty({type: String, description: "DEA del doctor"})
  @IsNotEmpty()
  @IsString()
  dea: string;

  @ApiProperty({type: String, description: "Educaciones del doctor", isArray: true})
  @IsNotEmpty()
  @IsString({ each: true })
  educationIds: string[];
}
