import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAdminDto } from './create-admin.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateAdminDto {
    
    @ApiProperty({type: String, description: 'Apellido del administrador', required: false})
    @IsString()
    @IsOptional()
    name : string
    
    @ApiProperty({ type: String, description: 'Apellido del administrador', required: false })
    @IsString()
    @IsOptional()
    lastName : string
    
    @ApiProperty({type: String, description: "Correo electrónico del administrador", required: false})
    @IsString()
    @IsOptional()
    email :string
}
