import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContractConditionService } from './contract_condition.service';
import { CreateContractConditionDto } from './dto/create-contract_condition.dto';
import { UpdateContractConditionDto } from './dto/update-contract_condition.dto';

@Controller('contract-condition')
export class ContractConditionController {
  constructor(private readonly contractConditionService: ContractConditionService) {}

  @Post()
  create(@Body() createContractConditionDto: CreateContractConditionDto) {
    return this.contractConditionService.create(createContractConditionDto);
  }

  @Get()
  findAll() {
    return this.contractConditionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contractConditionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContractConditionDto: UpdateContractConditionDto) {
    return this.contractConditionService.update(+id, updateContractConditionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractConditionService.remove(+id);
  }
}
