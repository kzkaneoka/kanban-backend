import { Injectable, Logger } from '@nestjs/common';
import { UserModel } from 'src/users/models/user.model';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly logger: Logger,
    private readonly usersService: UsersService,
  ) {}

  async validate(username: string, password: string): Promise<UserModel> {
    const message = `AuthService.validate() username=${username} password=${password}`;
    this.logger.log(message);
    const user = await this.usersService.findByUsername(username);
    if (user && user.password === password) {
      delete user.password;
      return user;
    }
    return null;
  }
}
