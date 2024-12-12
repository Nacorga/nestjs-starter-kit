import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authSrv: AuthService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    return this.authSrv.register(body.email, body.password);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authSrv.login(body.email, body.password);
  }
}
