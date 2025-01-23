import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreateDoctorDto } from './create-doctor.dto';

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {
  @ApiProperty({type: String, description: "Nombres del doctor"})
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({type: String, description: "Apellidos del doctor"})
  @IsOptional()
  @IsString()
  lastName: string;

  @ApiProperty({type: String, description: "Especialidad del doctor"})
  @IsOptional()
  @IsString()
  speciality: string;

  @ApiProperty({type: String, description: "Número de licencia del doctor"})
  @IsOptional()
  @IsString()
  licenseNumber: string;

  @ApiProperty({type: String, description: "DNI del doctor"})
  @IsOptional()
  @IsString()
  dni: string;

  @ApiProperty({type: String, description: "Número de DEA del doctor"})
  @IsOptional()
  @IsString()
  dea: string;
}
