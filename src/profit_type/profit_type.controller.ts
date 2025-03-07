import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfitTypeService } from './profit_type.service';
import { CreateProfitTypeDto } from './dto/create-profit_type.dto';
import { UpdateProfitTypeDto } from './dto/update-profit_type.dto';

@Controller('profit-type')
export class ProfitTypeController {
  constructor(private readonly profitTypeService: ProfitTypeService) {}

  @Post()
  create(@Body() createProfitTypeDto: CreateProfitTypeDto) {
    return this.profitTypeService.create(createProfitTypeDto);
  }

  @Get()
  findAll() {
    return this.profitTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profitTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfitTypeDto: UpdateProfitTypeDto) {
    return this.profitTypeService.update(+id, updateProfitTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profitTypeService.remove(+id);
  }
}
