import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { CreateNurseDto } from './create-nurse.dto';

export class UpdateNurseDto {
  @ApiProperty({type: String, description: "email del enfermero", required: false})
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({type: String, description: "nombres del enfermero", required: false})
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({type: String, description: "apellidos del enfermero", required: false})
  @IsOptional()
  @IsString()
  lastName: string;

  @ApiProperty({type: String, description: "especialidad del enfermero", required: false})
  @IsOptional()
  @IsString()
  speciality: string;

  @ApiProperty({type: String, description: "número de licencia del enfermero", required: false})
  @IsOptional()
  @IsString()
  licenseNumber: string;

  @ApiProperty({type: String, description: "Número de DEA del enfermero", required: false})
  @IsOptional()
  @IsString()
  dea: string;

  @ApiProperty({type: String, description: "DNI del enfermero", required: false})
  @IsOptional()
  @IsString()
  dni: string;
}
