import { Logger, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [PassportModule, UsersModule],
  providers: [AuthService, LocalStrategy, Logger],
  controllers: [AuthController],
})
export class AuthModule {}
