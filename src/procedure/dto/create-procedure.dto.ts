import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsPositive } from 'class-validator';

export class CreateProcedureDto {
  @ApiProperty({ type: String, description: 'Nombre del procedimiento quirúrgico'})
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: String, description: 'Descripción del procedimiento que se va a realizar' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ type: Number, description: 'Duración en minutos de los procedimientos, considerando que si tiene más de 60 minutos se adecúan el número de horas' })
  @IsPositive()
  @IsNotEmpty()
  @IsNumber()
  durationMinutes: number;

  @ApiProperty({ type: Number, description: 'Duración en minutos de los procedimientos' })
  @IsPositive()
  @IsNotEmpty()
  @IsNumber()
  durationHours: number;
}
