import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { NurseModule } from './nurse/nurse.module';
import { ConfigModule } from './common/config/config.module';

@Module({
  imports: [PrismaModule, AuthModule, AdminModule, NurseModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
