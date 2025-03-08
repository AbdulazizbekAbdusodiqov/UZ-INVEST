import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AwsUploadModule } from '../upload/aws_upload.module';

@Module({
  imports:[PrismaModule, AwsUploadModule],
  controllers: [ContractController],
  providers: [ContractService],
})
export class ContractModule {}
