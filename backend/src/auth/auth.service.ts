import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
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
    if (user && compareSync(password, user.password)) {
      delete user.password;
      return user;
    }
    return null;
  }

  async signup(createUserDto: CreateUserDto): Promise<UserModel> {
    const message = `AuthService.signup() createUserDto=${JSON.stringify(
      createUserDto,
    )}`;
    this.logger.log(message);
    return this.usersService.create(createUserDto);
  }

  async login(user: UserModel): Promise<any> {
    const message = `AuthService.login() user=${JSON.stringify(user)}`;
    this.logger.log(message);
    const payload = { username: user.username, sub: user.id };
    const token = await this.jwtService.sign(payload);
    return { user, token };
  }

  findOne(id: string): Promise<UserModel> {
    const message = `AuthService.findOne() id=${id}`;
    this.logger.log(message);
    return this.usersService.findOne(id);
  }
}
