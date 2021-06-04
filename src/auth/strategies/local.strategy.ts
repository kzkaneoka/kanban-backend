import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserModel } from 'src/users/models/user.model';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly logger: Logger,
    private readonly authService: AuthService,
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<UserModel> {
    const message = `LocalStrategy.validate() username=${username} password=${password}`;
    this.logger.log(message);
    const user = await this.authService.validate(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
