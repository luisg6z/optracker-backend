import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @ApiProperty({ type: String, description: 'Correo electrónico del usuario que va a iniciar sesión'})
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ type: String, description: 'Contraseña del usuario que está iniciando sesión' })
    @IsString()
    @IsNotEmpty()
    password: string;
}