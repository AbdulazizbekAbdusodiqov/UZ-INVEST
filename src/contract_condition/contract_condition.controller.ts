import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ContractConditionService } from './contract_condition.service';
import { CreateContractConditionDto } from './dto/create-contract_condition.dto';
import { UpdateContractConditionDto } from './dto/update-contract_condition.dto';
import { UserGuard } from '../guards/user.guard';
import { AdminGuard } from '../guards/admin.guard';
import { ApiOperation } from '@nestjs/swagger';

@Controller('contract-condition')
export class ContractConditionController {
  constructor(private readonly contractConditionService: ContractConditionService) {}
  @ApiOperation({ summary: 'Create a new contract condition' })
  @UseGuards(UserGuard)
  @Post()
  create(@Body() createContractConditionDto: CreateContractConditionDto) {
    return this.contractConditionService.create(createContractConditionDto);
  }
  
  @ApiOperation({ summary: 'Get all contract conditions' })
  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.contractConditionService.findAll();
  }
  
  @ApiOperation({ summary: 'Get a contract condition by ID' })
  @UseGuards(UserGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contractConditionService.findOne(+id);
  }
  
  @ApiOperation({ summary: 'Update a contract condition by ID' })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContractConditionDto: UpdateContractConditionDto) {
    return this.contractConditionService.update(+id, updateContractConditionDto);
  }
  
  @ApiOperation({ summary: 'Delete a contract condition by ID' })
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractConditionService.remove(+id);
  }
}
