import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { MailModule } from '../mail/mail.module';

@Module({
  imports:[
    JwtModule.register({global:true}),
    SequelizeModule.forFeature([Admin]),
    MailModule
  ],
  controllers: [AdminController],
  providers: [AdminService,JwtService, MailService ],
  exports:[AdminService]
})
export class AdminModule {}
