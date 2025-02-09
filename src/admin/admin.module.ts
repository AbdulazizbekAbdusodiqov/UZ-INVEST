import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    JwtModule.register({global:true}),
    SequelizeModule.forFeature([Admin])
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
