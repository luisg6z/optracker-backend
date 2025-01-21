import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { CreateNurseDto } from './create-nurse.dto';

export class UpdateNurseDto extends PartialType(CreateNurseDto) {
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
  speciality: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  licenseNumber: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  dea: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  dni: string;
}
