import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateSurgeryDto {
  @ApiProperty({type: String, description: "Título de la cirugía"})
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({type: Date, description: "Fecha de la cirugía"})
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @ApiProperty({enum: Status, enumName: "Status-enum", description: 'Progreso de la cirugía'})
  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;

  @ApiProperty({type: Number, description: "Id of the patient"})
  @IsNotEmpty()
  @IsNumber()
  patientId: number;

  @ApiProperty({type: Number, description: "Ids de las enfermeras", isArray: true})
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  nurseIds: number[];

  @ApiProperty({type: Number, description: "Ids de los doctores", isArray: true})
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  doctorIds: number[];

  @ApiProperty({type: Number, description: "Ids de los procedimientos", isArray: true})
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  procedureIds: number[];
}
