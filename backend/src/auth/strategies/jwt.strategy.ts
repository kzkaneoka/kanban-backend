import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly logger: Logger) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret',
    });
  }

  async validate(payload: any): Promise<any> {
    const message = `JwtStrategy.validate() payload=${JSON.stringify(payload)}`;
    this.logger.log(message);
    return { userId: payload.sub, username: payload.username };
  }
}
