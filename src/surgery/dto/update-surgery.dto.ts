import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateSurgeryDto } from './create-surgery.dto';

export class UpdateSurgeryDto extends PartialType(CreateSurgeryDto) {
  @ApiProperty({type: String, description: "Título de la cirugía"})
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({type: Date, description: "Fecha de la cirugía"})
  @IsOptional()
  @IsDateString()
  date: Date;

  @ApiProperty({enum: Status, enumName: "Status-enum", description: 'Progreso de la cirugía'})
  @IsOptional()
  @IsEnum(Status)
  status: Status;

  @ApiProperty({type: Number, description: "Id of the patient"})
  @IsOptional()
  @IsNumber()
  patientId: number;

  @ApiProperty({type: Number, description: "Ids de las enfermeras", isArray: true})
  @IsOptional()
  @IsNumber({}, { each: true })
  nurseIds: number[];

  @ApiProperty({type: Number, description: "Ids de los doctores", isArray: true})
  @IsOptional()
  @IsNumber({}, { each: true })
  doctorIds: number[];

  @ApiProperty({type: Number, description: "Ids de los procedimientos", isArray: true})
  @IsOptional()
  @IsNumber({}, { each: true })
  procedureIds: number[];
}

export class UpdateStatusProcedureDTO {
  @ApiProperty({type: Number, description: 'Id de la cirugía'})
  @IsNotEmpty()
  @IsNumber()
  surgeryId: number;

  @ApiProperty({type: Number, description: 'Ids de los procedimientos'})
  @IsNotEmpty()
  @IsNumber()
  procedureId: number;

  @ApiProperty({ type: Boolean, description: 'Es verdadero cuando el procedimiento ha sido completado' })
  @IsOptional()
  @IsBoolean()
  done: boolean;
}
