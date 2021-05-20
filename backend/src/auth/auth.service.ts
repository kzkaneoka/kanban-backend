import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from 'src/users/models/user.model';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly logger: Logger,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
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

  async login(user: UserModel): Promise<any> {
    const message = `AuthService.login() user=${JSON.stringify(user)}`;
    this.logger.log(message);
    const payload = { username: user.username, sub: user.id };
    const token = await this.jwtService.sign(payload);
    return { user, token };
  }
}
