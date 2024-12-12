import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { ENV_NAME } from './constants/env.constants';
import * as path from 'path';
import { UsersModule } from './resources/users/users.module';
import { AuthModule } from './resources/auth/auth.module';

const configOpts: ConfigModuleOptions = {
  isGlobal: true,
  ignoreEnvFile: process.env.NODE_ENV === ENV_NAME.PRODUCTION,
  envFilePath: path.resolve(__dirname, '..', 'config', '.env'),
};

const modules = [AuthModule, UsersModule];

@Module({
  imports: [ConfigModule.forRoot(configOpts), ...modules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
