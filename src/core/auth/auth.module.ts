import { AdminModule } from '@/admin/admin.module';
import { NurseModule } from '@/medTeam/nurse/nurse.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from 'src/common/config/config.module';
import { ConfigService } from 'src/common/config/config.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getJwtSecret(),
        signOptions: {
          expiresIn: configService.getJwtExpiration(),
        },
      }),
    }),
    NurseModule,
    AdminModule,
  ],
  exports: [AuthService],
})
export class AuthModule {}
