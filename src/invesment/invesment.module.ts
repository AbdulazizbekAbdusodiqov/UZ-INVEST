import { Module } from '@nestjs/common';
import { InvesmentService } from './invesment.service';
import { InvesmentController } from './invesment.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [InvesmentController],
  providers: [InvesmentService],
})
export class InvesmentModule {}
