import { Module } from '@nestjs/common';
import { ContractConditionService } from './contract_condition.service';
import { ContractConditionController } from './contract_condition.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [ContractConditionController],
  providers: [ContractConditionService],
})
export class ContractConditionModule {}
