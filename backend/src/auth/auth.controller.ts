import { Controller, Logger, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserModel } from 'src/users/models/user.model';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly logger: Logger,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req): Promise<UserModel> {
    const message = `AuthController.login() user=${JSON.stringify(req.user)}`;
    this.logger.log(message);
    return req.user;
  }
}
