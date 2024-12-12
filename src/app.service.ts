import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ENV, ENV_NAME } from './constants/env.constants';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  get NODE_ENV(): ENV_NAME {
    return this.configService.get<ENV_NAME>(ENV.NODE_ENV);
  }

  get JWT_SECRET(): string {
    return this.configService.get<string>(ENV.JWT_SECRET);
  }

  get RESEND_API_KEY(): string {
    return this.configService.get<string>(ENV.RESEND_API_KEY);
  }

  getHello(): string {
    return 'Hello World from NestJS Starter Kit API!';
  }
}
