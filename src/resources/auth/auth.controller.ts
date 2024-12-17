import { Controller, Post, Body, HttpCode, HttpStatus, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { CreateUserGoogleDto } from '../users/dtos/create-user-google.dto';

@Controller('auth')
export class AuthController {
  constructor(private authSrv: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async sign(@Request() req) {
    const userId = req.user.userId;

    return this.authSrv.sign(userId);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authSrv.login(body.email, body.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login/google')
  async googleLogin(@Body('code') code: string) {
    return this.authSrv.loginWithGoogle(code);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() body: CreateUserDto) {
    return this.authSrv.register(body);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register/google')
  async registerWithGoogle(@Body() body: CreateUserGoogleDto) {
    return this.authSrv.registerWithGoogle(body);
  }
}
