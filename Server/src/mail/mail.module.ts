import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';

@Module({
    imports: [
        MailerModule.forRoot({
            // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
            // or
            transport: {
                host: 'smtp.gmail.com',
                port: 587,
                auth: {
                    user: 'pizza.js.spd@gmail.com',
                    pass: 'pizza.js.123'
                },
            },
            defaults: {
                from: '"No Reply" <noreply@example.com>',
            },
            template: {
                dir: join(__dirname, 'templates'),
                adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
                options: {
                    strict: true,
                },
            },
        }),
    ],
    providers: [MailService],
    exports: [MailService], // 👈 export for DI
})
export class MailModule {
}
