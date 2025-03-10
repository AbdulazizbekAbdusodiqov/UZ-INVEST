import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { InvesmentService } from './invesment.service';
import { CreateInvesmentDto } from './dto/create-invesment.dto';
import { UpdateInvesmentDto } from './dto/update-invesment.dto';
import { AdminGuard } from '../guards/admin.guard';

@Controller('invesment')
export class InvesmentController {
  constructor(private readonly invesmentService: InvesmentService) {}

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createInvesmentDto: CreateInvesmentDto) {
    return this.invesmentService.create(createInvesmentDto);
  }
  
  @Get()
  findAll() {
    return this.invesmentService.findAll();
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invesmentService.findOne(+id);
  }
  
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvesmentDto: UpdateInvesmentDto) {
    return this.invesmentService.update(+id, updateInvesmentDto);
  }
  
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invesmentService.remove(+id);
  }
}
