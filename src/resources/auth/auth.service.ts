import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersSrv: UsersService,
    private jwtSrv: JwtService,
  ) {}

  async register(email: string, password: string) {
    const user = await this.usersSrv.createUser(email, password);

    return this.generateToken(user);
  }

  async login(email: string, password: string) {
    const user = await this.usersSrv.findByEmail(email);
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateToken(user);
  }

  private generateToken(user: any) {
    const payload = { email: user.email, sub: user._id.toString() };

    return {
      access_token: this.jwtSrv.sign(payload),
    };
  }
}
