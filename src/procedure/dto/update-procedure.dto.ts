import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateProcedureDto } from './create-procedure.dto';

export class UpdateProcedureDto extends PartialType(CreateProcedureDto) {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  durationMinutes: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  durationHours: number;
}
