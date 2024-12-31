import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAdminDto } from './create-admin.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
    
    @ApiProperty()
    @IsString()
    @IsOptional()
    name : string
    
    @ApiProperty()
    @IsString()
    @IsOptional()
    lastName : string
    
    @ApiProperty()
    @IsString()
    @IsOptional()
    email :string
}
