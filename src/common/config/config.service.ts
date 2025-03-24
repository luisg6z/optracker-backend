import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private readonly jwtSecret: string | undefined;
  private readonly jwtExpiration: string | undefined;

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET;
    this.jwtExpiration = process.env.JWT_EXPIRES_IN;
  }

  getJwtSecret(): string {
    return this.jwtSecret;
  }

  getJwtExpiration(): string {
    return this.jwtExpiration;
  }
}
