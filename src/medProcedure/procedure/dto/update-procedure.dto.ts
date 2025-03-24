import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsPositive } from 'class-validator';
import { CreateProcedureDto } from './create-procedure.dto';

export class UpdateProcedureDto extends PartialType(CreateProcedureDto) {
  @ApiProperty({
    type: String,
    description: 'Nombre del procedimiento quirúrgico',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    description: 'Descripción del procedimiento que se va a realizar',
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    type: Number,
    description:
      'Duración en minutos de los procedimientos, considerando que si tiene más de 60 minutos se adecúan el número de horas',
  })
  @IsPositive()
  @IsOptional()
  @IsNumber()
  durationMinutes: number;

  @ApiProperty({
    type: Number,
    description: 'Duración en minutos de los procedimientos',
  })
  @IsPositive()
  @IsOptional()
  @IsNumber()
  durationHours: number;
}
