import { ENV } from '@/constants/env.constants';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client, TokenPayload } from 'google-auth-library';

@Injectable()
export class GoogleService {
  private OAuthClient: OAuth2Client;

  constructor(private config: ConfigService) {
    this.OAuthClient = new OAuth2Client(this.config.get<string>(ENV.GOOGLE_CLIENT_ID));
  }

  async sign(code: string): Promise<string> {
    const payload = await this.getPayload(code);

    return payload['email'];
  }

  async register(code: string): Promise<{ email: string; name: string; picture: string }> {
    const payload = await this.getPayload(code);

    return {
      email: payload['email'],
      name: payload['name'],
      picture: payload['picture'],
    };
  }

  private async getPayload(code: string): Promise<TokenPayload> {
    const ticket = await this.OAuthClient.verifyIdToken({
      idToken: code,
      audience: this.config.get<string>(ENV.GOOGLE_CLIENT_ID),
    });

    const payload = ticket.getPayload();
    const email = payload['email'];

    if (!email) {
      throw new BadRequestException();
    }

    return payload;
  }
}
