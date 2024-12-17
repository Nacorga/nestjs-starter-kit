import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { GoogleService } from '@/lib/google/google.service';
import { User, UserDoc } from '../users/schemas/user.schema';
import { Auth } from './auth.interface';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { CreateUserGoogleDto } from '../users/dtos/create-user-google.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersSrv: UsersService,
    private jwtSrv: JwtService,
    private googleSrv: GoogleService,
  ) {}

  async sign(id: string): Promise<User> {
    return this.usersSrv.findById(id);
  }

  async login(email: string, password: string): Promise<Auth> {
    const user = await this.usersSrv.findByEmail(email);
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      user,
      access_token: this.generateToken(user),
    };
  }

  async loginWithGoogle(code: string): Promise<Auth> {
    const email = await this.googleSrv.sign(code);
    const user = await this.usersSrv.findByEmail(email);

    return {
      user,
      access_token: this.generateToken(user),
    };
  }

  async register(body: CreateUserDto): Promise<Auth> {
    const user = await this.usersSrv.createUser(body);

    return {
      user,
      access_token: this.generateToken(user),
    };
  }

  async registerWithGoogle({ code, lang }: CreateUserGoogleDto): Promise<Auth> {
    const { email, name, picture } = await this.googleSrv.register(code);

    const data: Partial<User> = {
      email,
      lang,
      loginType: 'google',
      ...(name && { name }),
      ...(picture && { img: picture }),
    };

    const user = await this.usersSrv.createUser(data);

    return {
      user,
      access_token: this.generateToken(user),
    };
  }

  private generateToken(user: UserDoc) {
    const payload = { email: user.email, sub: user._id.toString() };

    return this.jwtSrv.sign(payload);
  }
}
