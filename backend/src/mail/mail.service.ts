import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { UserModel } from '../users/models/user.model';

@Injectable()
export class MailService {
  constructor(
    private readonly logger: Logger,
    private readonly mailerService: MailerService,
  ) {}

  sendUserConfirmation(user: UserModel, token: string) {
    const message = `MailService.sendUserConfirmation() user=${JSON.stringify(
      user,
    )} token=${token}`;
    this.logger.log(message);
    const url = ` http://localhost:3000/api/v1/auth/confirm?token=${token}`;
    this.mailerService.sendMail({
      to: user.email,
      from: '"Support Team" <support@kanban.com>',
      subject: 'Welcome To Kanban App! Confirm Your Email',
      template: './confirmation',
      context: {
        username: user.username,
        url,
      },
    });
  }
}
