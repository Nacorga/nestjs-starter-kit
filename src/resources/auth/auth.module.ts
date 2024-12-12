import { Module } from '@nestjs/common';
import { IAuthModuleOptions, PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { JwtModule, JwtModuleAsyncOptions } from '@nestjs/jwt';
import { AppService } from '@/app.service';

const passportOpts: IAuthModuleOptions = {
  defaultStrategy: 'jwt',
};

const jwtOpts: JwtModuleAsyncOptions = {
  extraProviders: [AppService],
  inject: [AppService],
  useFactory: async (appSrv: AppService) => ({
    secret: appSrv.JWT_SECRET,
    signOptions: { expiresIn: '1d' },
  }),
};

@Module({
  imports: [UsersModule, PassportModule.register(passportOpts), JwtModule.registerAsync(jwtOpts)],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
