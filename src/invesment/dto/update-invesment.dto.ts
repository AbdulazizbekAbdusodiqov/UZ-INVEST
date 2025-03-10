import { PartialType } from '@nestjs/swagger';
import { CreateInvesmentDto } from './create-invesment.dto';

export class UpdateInvesmentDto extends PartialType(CreateInvesmentDto) {}
