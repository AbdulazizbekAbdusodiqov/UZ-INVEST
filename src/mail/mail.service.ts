import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Admin } from '../admin/models/admin.model';

@Injectable()
export class MailService {

    constructor(private mailerService: MailerService) { }

    async sendAdminMail(admin:Admin) {
        const url = `${process.env.API_URL}/admin/activate/${admin.activation_link}`;
        console.log(url);
        await this.mailerService.sendMail({
            to: admin.email,
            subject: `Welcome to UZ-INVEST`,
            template: "./confirm",
            context: {
                name: admin.first_name,
                url
            },
        });
        console.log(url);
    }
    // async sendUserMail(admin:Admin) {
    //     const url = `${process.env.API_URL}/user/activate/${admin.activation_link}`;
    //     console.log(url);
    //     await this.mailerService.sendMail({
    //         to: admin.email,
    //         subject: `Welcome to UZ-INVEST`,
    //         template: "./confirm",
    //         context: {
    //             name: admin.first_name,
    //             url
    //         },
    //     });
    //     console.log(url);
    // }
}
