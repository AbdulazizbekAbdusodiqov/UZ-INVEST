import { PartialType } from '@nestjs/swagger';
import { CreateContractConditionDto } from './create-contract_condition.dto';

export class UpdateContractConditionDto extends PartialType(CreateContractConditionDto) {}
