import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { NurseModule } from 'src/nurse/nurse.module';
import { AdminModule } from 'src/admin/admin.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from 'src/common/config/config.module';
import { ConfigService } from 'src/common/config/config.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [JwtModule.registerAsync({
    global: true,
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.getJwtSecret(),
      signOptions: {
        expiresIn: configService.getJwtExpiration()
      },
    })
  })
  , NurseModule, AdminModule],
  exports: [AuthService],
})
export class AuthModule {}
