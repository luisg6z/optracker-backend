import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authHeaders = request.headers.authorization;

    if (!authHeaders) {
      throw new UnauthorizedException('Authorization headers were not found');
    }
    const [bearer, token] = authHeaders.split(' ');

    if (bearer !== 'Bearer') {
      throw new UnauthorizedException('Invalid authorization header');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
