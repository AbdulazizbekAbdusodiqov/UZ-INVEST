import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserGuard } from '../guards/user.guard';
import { AdminGuard } from '../guards/admin.guard';
import { ApiOperation } from '@nestjs/swagger';

@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @ApiOperation({ summary: 'Create a new contract' })
  @UseGuards(UserGuard)
  @Post()
  @UseInterceptors(FileInterceptor("condition_file"))
  create(@Body() createContractDto: CreateContractDto, @UploadedFile() condition_file: any) {
    return this.contractService.create(createContractDto, condition_file);
  }
  
  @ApiOperation({ summary: 'Get all contracts' })
  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.contractService.findAll();
  }
  
  @ApiOperation({ summary: 'Get a contract by ID' })
  @UseGuards(UserGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contractService.findOne(+id);
  }
  
  @ApiOperation({ summary: 'Update a contract by ID' })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContractDto: UpdateContractDto) {
    return this.contractService.update(+id, updateContractDto);
  }
  
  @ApiOperation({ summary: 'Delete a contract by ID' })
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractService.remove(+id);
  }
  
  //muddati tugagan yoki rad etilgan kontraktlar
  @ApiOperation({ summary: 'Get all finished or canceled contracts' })
  @UseGuards(AdminGuard)
  @Get('finished-or-canceled')
  findAllFinishedOrCanceledContacts() {
    return this.contractService.findAllFinishedOrCanceledContacts();
  }

  //Kelajakda boshlanadigan kontraktlar
  @ApiOperation({ summary: 'Get all upcoming approved contracts' })
  @UseGuards(AdminGuard)
  @Get('upcoming-approved')
  findUpcomingApprovedContracts() {
    return this.contractService.findUpcomingApprovedContracts();
  }

}
