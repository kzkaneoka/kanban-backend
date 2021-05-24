import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Public } from 'src/auth/decorators/public-auth.decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserModel } from 'src/users/models/user.model';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly logger: Logger,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  @Public()
  signup(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
    const message = `AuthController.signup() createUserDto=${JSON.stringify(
      createUserDto,
    )}`;
    this.logger.log(message);
    return this.authService.signup(createUserDto);
  }

  @Post('login')
  @Public()
  @UseGuards(AuthGuard('local'))
  login(@Request() req): Promise<any> {
    const message = `AuthController.login() user=${JSON.stringify(req.user)}`;
    this.logger.log(message);
    return this.authService.login(req.user);
  }

  @Get('profile')
  profile(@Request() req): Promise<UserModel> {
    const message = `AuthController.profile() user=${JSON.stringify(req.user)}`;
    this.logger.log(message);
    return req.user;
  }
}
