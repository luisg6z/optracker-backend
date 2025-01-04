import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDoctorDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  names: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastNames: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  speciality: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  licenseNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  dni: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  dea: string;
}
