import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEducationDto {
  @ApiProperty({type: String, description: "Nombre de la educación"})
  @IsNotEmpty()
  @IsString()
  institutionName: string;
}
