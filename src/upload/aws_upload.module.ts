import { Module } from '@nestjs/common';
import { AwsFileService } from './aws_upload.service';

@Module({
  providers: [AwsFileService],
  exports:[AwsFileService]
})
export class AwsUploadModule {}
