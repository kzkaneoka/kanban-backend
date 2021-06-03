import { Logger, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MailModule } from 'src/mail/mail.module';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    JwtModule.register({ secret: 'secret' }),
    MailModule,
    PassportModule,
    UsersModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, Logger],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
