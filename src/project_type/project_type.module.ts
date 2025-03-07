import { Module } from '@nestjs/common';
import { ProjectTypeService } from './project_type.service';
import { ProjectTypeController } from './project_type.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [ProjectTypeController],
  providers: [ProjectTypeService],
})
export class ProjectTypeModule {}
