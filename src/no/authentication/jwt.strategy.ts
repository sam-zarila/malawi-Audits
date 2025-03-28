// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'your_jwt_secret_key', // Replace with a secure secret, ideally stored in environment variables
    });
  }

  async validate(payload: any) {
    // The payload usually contains sub (id) and email. Customize as needed.
    return { id: payload.sub, email: payload.email };
  }
}
