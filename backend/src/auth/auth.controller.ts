import {
  Controller,
  Get,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserModel } from 'src/users/models/user.model';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly logger: Logger,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(@Request() req): Promise<any> {
    const message = `AuthController.login() user=${JSON.stringify(req.user)}`;
    this.logger.log(message);
    return this.authService.login(req.user);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  profile(@Request() req): Promise<UserModel> {
    const message = `AuthController.profile() user=${JSON.stringify(req.user)}`;
    this.logger.log(message);
    return req.user;
  }
}
