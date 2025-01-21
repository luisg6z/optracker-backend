import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEducationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  institutionName: string;
}
