import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Admin, User } from '@prisma/client';

@Injectable()
export class MailService {

    constructor(private mailerService: MailerService) { }

    async sendMail(user: User) {
        const url = `${process.env.API_URL}/api/auth/activate/${user.activation_link}`;
        console.log(url);
        await this.mailerService.sendMail({
            to: user.email,
            subject: `UZ-INVESTga hush kelibsiz!`,
            template: "./confirm",
            context: {
                name: `${user.first_name} ${user.last_name}`,
                url
            },
        });
    }
    async sendAdminMail(admin: Admin) {
        const url = `${process.env.API_URL}/api/auth/admin/activate/${admin.activation_link}`;
        console.log(url);
        await this.mailerService.sendMail({
            to: admin.email,
            subject: `UZ-INVESTga hush kelibsiz!`,
            template: "./confirm",
            context: {
                name: `${admin.first_name} ${admin.last_name}`,
                url
            },
        });
    }
}