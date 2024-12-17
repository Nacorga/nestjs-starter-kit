import { Module } from '@nestjs/common';
import { GoogleService } from './google.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [ConfigService, GoogleService],
  exports: [GoogleService],
})
export class GoogleModule {}
