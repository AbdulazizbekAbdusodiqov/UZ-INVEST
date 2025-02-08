import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './admin/models/admin.model';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
  SequelizeModule.forRoot({
    dialect: "postgres",
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USER,
    port: Number(process.env.POSTGRES_PORT),
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    models: [
      Admin,
    ],
    autoLoadModels: true,
    sync: { alter: true },
    logging: true
  }),
    AdminModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
