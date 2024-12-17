import { Module } from '@nestjs/common';
import { IAuthModuleOptions, PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { JwtModule, JwtModuleAsyncOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ENV } from '@/constants/env.constants';
import { GoogleModule } from '@/lib/google/google.module';
import { UtilsModule } from '@/lib/utils/utils.module';

const passportOpts: IAuthModuleOptions = {
  defaultStrategy: 'jwt',
};

const jwtOpts: JwtModuleAsyncOptions = {
  extraProviders: [ConfigService],
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => ({
    secret: config.get<string>(ENV.JWT_SECRET),
    signOptions: { expiresIn: '1d' },
  }),
};

@Module({
  imports: [
    PassportModule.register(passportOpts),
    JwtModule.registerAsync(jwtOpts),
    UsersModule,
    GoogleModule,
    UtilsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
