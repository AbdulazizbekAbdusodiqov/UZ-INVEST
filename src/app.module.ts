import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProfitTypeModule } from './profit_type/profit_type.module';
import { ProjectTypeModule } from './project_type/project_type.module';
import { AwsUploadModule } from './upload/aws_upload.module';
import { ProjectModule } from './project/project.module';
import { BidsModule } from './bids/bids.module';
import { ContractModule } from './contract/contract.module';
import { ContractConditionModule } from './contract_condition/contract_condition.module';
import { PaymentModule } from './payment/payment.module';

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
        PrismaModule,
        AdminModule,
        UserModule,
        AuthModule,
        ProfitTypeModule,
        ProjectTypeModule,
        AwsUploadModule,
        ProjectModule,
        BidsModule,
        ContractModule,
        ContractConditionModule,
        PaymentModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
