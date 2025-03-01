import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Admin } from '../admin/models/admin.model';

@Injectable()
export class MailService {

    constructor(private mailerService: MailerService) { }

    async sendMail(user:any, role:string = "admin") {
        const url = `${process.env.API_URL}/${role}/activate/${user.activation_link}`;
        console.log(url);
        await this.mailerService.sendMail({
            to: user.email,
            subject: `Welcome to UZ-INVEST`,
            template: "./confirm",
            context: {
                name: user.first_name,
                url
            },
        });
        console.log(url);
    }

}
