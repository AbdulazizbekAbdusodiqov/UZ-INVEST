import { Module } from '@nestjs/common';
import { ProfitTypeService } from './profit_type.service';
import { ProfitTypeController } from './profit_type.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [ProfitTypeController],
  providers: [ProfitTypeService],
})
export class ProfitTypeModule {}
