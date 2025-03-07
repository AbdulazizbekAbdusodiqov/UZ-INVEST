import { PartialType } from '@nestjs/swagger';
import { CreateProjectTypeDto } from './create-project_type.dto';

export class UpdateProjectTypeDto extends PartialType(CreateProjectTypeDto) {}
