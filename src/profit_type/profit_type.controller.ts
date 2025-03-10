import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ProfitTypeService } from './profit_type.service';
import { CreateProfitTypeDto } from './dto/create-profit_type.dto';
import { UpdateProfitTypeDto } from './dto/update-profit_type.dto';
import { AdminGuard } from '../guards/admin.guard';

@Controller('profit-type')
export class ProfitTypeController {
  constructor(private readonly profitTypeService: ProfitTypeService) {}
  @ApiOperation({ summary: 'Create a new profit type' })
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createProfitTypeDto: CreateProfitTypeDto) {
    return this.profitTypeService.create(createProfitTypeDto);
  }
  @ApiOperation({ summary: 'Get all profit types' })
  @Get()
  findAll() {
    return this.profitTypeService.findAll();
  }
  
  @ApiOperation({ summary: 'Get a profit type by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profitTypeService.findOne(+id);
  }
  
  @ApiOperation({ summary: 'Update a profit type by ID' })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfitTypeDto: UpdateProfitTypeDto) {
    return this.profitTypeService.update(+id, updateProfitTypeDto);
  }
  
  @ApiOperation({ summary: 'Delete a profit type by ID' })
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profitTypeService.remove(+id);
  }
}
