import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/common/constants'
import { ROLES_KEY } from '../decorator/roles.decorator';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedError } from 'src/common/errors/service.errors';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService
  ) {}
  canActivate( context: ExecutionContext,){

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredRoles) {
      return true
    }

    const request = context.switchToHttp().getRequest()

    const token = request.headers.authorization.split(' ')[1]

    try {
      const decoded = this.jwtService.verify(token)
      const userRole = decoded.role
      return requiredRoles.includes(userRole)

    } catch (error) {
      throw new UnauthorizedException("invalid token")
    }
  }
}
