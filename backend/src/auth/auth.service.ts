import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Role } from 'src/users/enum/role.enum';
import { UserModel } from 'src/users/models/user.model';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly logger: Logger,
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
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
    const user = await this.usersService.create(createUserDto);
    const payload = { username: user.username, sub: user.id };
    const options = { expiresIn: '15m' };
    const token = await this.jwtService.sign(payload, options);
    await this.mailService.sendUserConfirmation(user, token);
    return user;
  }

  async login(user: UserModel): Promise<any> {
    const message = `AuthService.login() user=${JSON.stringify(user)}`;
    this.logger.log(message);
    const payload = { username: user.username, sub: user.id };
    const options = { expiresIn: '30d' };
    const token = await this.jwtService.sign(payload, options);
    return { user, token };
  }

  findOne(id: string): Promise<UserModel> {
    const message = `AuthService.findOne() id=${id}`;
    this.logger.log(message);
    return this.usersService.findOne(id);
  }

  async confirm(token: string): Promise<UserModel> {
    const message = `AuthService.confirm() token=${token}`;
    this.logger.log(message);
    const decoded_token = await this.jwtService.decode(token);
    return this.usersService.updateRole(decoded_token.sub, Role.USER);
  }
}
