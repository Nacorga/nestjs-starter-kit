import { ENV } from '@/constants/env.constants';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class MailingService {
  private resend: Resend;

  constructor(private readonly config: ConfigService) {
    this.resend = new Resend(this.config.get<string>(ENV.RESEND_API_KEY));
  }

  // async addContact(email: string): Promise<void> {
  //   this.resend.contacts.create({
  //     email,
  //     unsubscribed: false,
  //     audienceId: this.appSrv.RESEND_AUDIENCE_ID,
  //   });
  // }

  async sendHtmlEmail(to: string[], subject: string, html: string): Promise<void> {
    this.resend.emails.send({
      from: 'onboarding@resend.dev',
      to: to,
      subject: subject,
      html,
    });
  }
}
