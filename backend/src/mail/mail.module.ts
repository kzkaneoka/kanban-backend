import { Logger, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: 'chauncey45@ethereal.email',
          pass: 'N4A2gU77fuqJkhCJHk',
        },
      },
      defaults: {
        from: '"No Reply" <noreply@kanban.com>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [Logger, MailService],
  exports: [MailService],
})
export class MailModule {}
