import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public-auth.decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserModel } from 'src/users/models/user.model';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
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
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          description: 'Username for login.',
          example: 'user1',
        },
        password: {
          type: 'string',
          description: 'Password for login.',
          example: '123456',
        },
      },
    },
  })
  login(@Request() req): Promise<any> {
    const message = `AuthController.login() user=${JSON.stringify(req.user)}`;
    this.logger.log(message);
    return this.authService.login(req.user);
  }

  /**
   * Token is generated when user signup and it will be expired in 15 mins.
   * User needs to confirm its email in 15 mins.
   * @param token
   */
  @Get('confirm')
  @Public()
  confirm(@Query('token') token: string): Promise<UserModel> {
    const message = `AuthController.confirm() token=${token}`;
    this.logger.log(message);
    return this.authService.confirm(token);
  }

  @Get('profile')
  @ApiBearerAuth()
  profile(@Request() req): Promise<UserModel> {
    const message = `AuthController.profile() user=${JSON.stringify(req.user)}`;
    this.logger.log(message);
    return req.user;
  }
}
