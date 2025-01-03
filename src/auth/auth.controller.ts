import { Body, Controller, HttpCode, HttpStatus, InternalServerErrorException, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UnauthorizedError } from 'src/common/errors/service.errors';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto){
    try {
      const user = await this.authService.login(loginDto);
  
      if(!user) {
        throw new UnauthorizedError("Invalid credentials")
      }
  
      return user;
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        throw new UnauthorizedException(error.message)
      }
      throw new InternalServerErrorException(error.message, {cause: error})
    }
  }
}
