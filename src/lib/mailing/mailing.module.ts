import { Module } from '@nestjs/common';
import { MailingService } from './mailing.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [ConfigService, MailingService],
  exports: [MailingService],
})
export class MailingModule {}
