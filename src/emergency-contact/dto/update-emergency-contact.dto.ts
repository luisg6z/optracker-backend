import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateEmergencyContactDto } from './create-emergency-contact.dto';

export class UpdateEmergencyContactDto extends PartialType(
  CreateEmergencyContactDto,
) {
  @ApiProperty({ type: String, description: 'Nombre del contacto de emergencia'})
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ type: String, description: 'Apellido del contacto de emergencia'})
  @IsOptional()
  @IsString()
  lastName: string;

  @ApiProperty({ type: String, description: 'Correo electrónico del contacto de emergencia'})
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, description: 'Documento de identidad del contacto de emergencia'})
  @IsOptional()
  @IsString()
  dni: string;

  @ApiProperty({ type: String, description: 'Número de teléfono del contacto de emergencia'})
  @IsOptional()
  @IsString()
  phoneNumber: string;

  @ApiProperty({ type: Number, description: 'Clave foránea del paciente que se esté registrando para esta cirugía'})
  @IsOptional()
  @IsNumber()
  patientId: number;
}
