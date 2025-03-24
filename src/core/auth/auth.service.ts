import { AdminService } from '@/admin/admin.service';
import { LoginDto } from '@/auth/dto/login.dto';
import { NurseService } from '@/medTeam/nurse/nurse.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/common/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly nurseService: NurseService,
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    try {
      const nurse = await this.nurseService.findOneByEmail(loginDto.email);

      if (nurse && (await bcrypt.compare(loginDto.password, nurse.password))) {
        const payload = { email: nurse.email, id: nurse.id, role: Role.NURSE };
        const token = await this.jwtService.signAsync(payload);
        return {
          email: nurse.email,
          token: token,
          role: Role.NURSE,
        };
      }

      const admin = await this.adminService.findOneByEmail(loginDto.email);

      if (admin && (await bcrypt.compare(loginDto.password, admin.password))) {
        const payload = { email: admin.email, id: admin.id, role: Role.ADMIN };
        const token = await this.jwtService.signAsync(payload);
        return {
          email: admin.email,
          token: token,
          role: Role.ADMIN,
        };
      }

      return null;
    } catch (error) {
      console.log(error);
    }
  }
}
