import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreateEducationDto } from './create-education.dto';

export class UpdateEducationDto extends PartialType(CreateEducationDto) {
  @ApiProperty({ type: String, description: 'Nombres de la educación' })
  @IsOptional()
  @IsString()
  institutionName: string;
}
