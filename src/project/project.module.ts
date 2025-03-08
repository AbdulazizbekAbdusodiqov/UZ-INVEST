import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AwsUploadModule } from '../upload/aws_upload.module';

@Module({
  imports:[PrismaModule, AwsUploadModule],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
