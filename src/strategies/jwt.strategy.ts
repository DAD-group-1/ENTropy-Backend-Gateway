import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { JwtUserInterface } from '../helpers/interfaces/jwtUser.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
    });
  }

  validate(payload: {
    sub: string;
    email: string;
    data?: { role: string };
  }): JwtUserInterface {
    return {
      id: Number(payload.sub),
      email: payload.email,
      role: payload.data?.role ?? '',
    };
  }
}
