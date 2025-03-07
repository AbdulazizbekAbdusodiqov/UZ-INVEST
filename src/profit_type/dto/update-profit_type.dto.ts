import { PartialType } from '@nestjs/swagger';
import { CreateProfitTypeDto } from './create-profit_type.dto';

export class UpdateProfitTypeDto extends PartialType(CreateProfitTypeDto) {}
