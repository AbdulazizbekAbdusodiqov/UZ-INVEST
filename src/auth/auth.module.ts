import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AdminModule } from '../admin/admin.module';
import { PrismaModule } from '../prisma/prisma.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports:[
    JwtModule.register({ global: true }),
    UserModule,
    AdminModule,
    PrismaModule,
    MailModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
