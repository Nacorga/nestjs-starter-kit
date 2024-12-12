import { ENV } from '@/constants/env.constants';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>(ENV.JWT_SECRET),
    });
  }

  async validate(payload: { email: string; sub: string; userId: string; iat: number; exp: number }) {
    return { userId: payload.sub, email: payload.email };
  }
}
