import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailDataDto } from '../csv/dto/emailData.dto';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {
    }

    async sendUserConfirmation(userMail: string, emailData: EmailDataDto) {
        await this.mailerService.sendMail({
            to: userMail,
            subject: 'Notification',
            template: './notification',
            context: {
                name: userMail,
                ...emailData,
            },
        });
    }
}
