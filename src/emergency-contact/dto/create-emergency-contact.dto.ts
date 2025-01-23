import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEmergencyContactDto {
  @ApiProperty({ type: String, description: 'Nombre del contacto de emergencia'})
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: String, description: 'Apellido del contacto de emergencia'})
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ type: String, description: 'Correo electrónico del contacto de emergencia'})
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, description: 'Documento de identidad del contacto de emergencia'})
  @IsNotEmpty()
  @IsString()
  dni: string;

  @ApiProperty({ type: String, description: 'Número de teléfono del contacto de emergencia'})
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({ type: Number, description: 'Clave foránea del paciente que se esté registrando para esta cirugía'})
  @IsNotEmpty()
  @IsNumber()
  patientId: number;
}
