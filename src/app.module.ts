import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProfitTypeModule } from './profit_type/profit_type.module';

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
        PrismaModule,
        AdminModule,
        UserModule,
        AuthModule,
        ProfitTypeModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
