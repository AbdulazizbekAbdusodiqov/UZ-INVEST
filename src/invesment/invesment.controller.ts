import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { InvesmentService } from './invesment.service';
import { CreateInvesmentDto } from './dto/create-invesment.dto';
import { UpdateInvesmentDto } from './dto/update-invesment.dto';
import { AdminGuard } from '../guards/admin.guard';
import { UserGuard } from '../guards/user.guard';
import { ApiOperation } from '@nestjs/swagger';

@Controller('invesment')
export class InvesmentController {
  constructor(private readonly invesmentService: InvesmentService) {}
  @ApiOperation({ summary: 'Create a new investment' })
  @UseGuards(UserGuard)
  @Post()
  create(@Body() createInvesmentDto: CreateInvesmentDto) {
    return this.invesmentService.create(createInvesmentDto);
  }
  
  @ApiOperation({ summary: 'Get all investments' })
  @Get()
  findAll() {
    return this.invesmentService.findAll();
  }
  
  @ApiOperation({ summary: 'Get an investment by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invesmentService.findOne(+id);
  }
  
  @ApiOperation({ summary: 'Update an investment by ID' })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvesmentDto: UpdateInvesmentDto) {
    return this.invesmentService.update(+id, updateInvesmentDto);
  }
  
  @ApiOperation({ summary: 'Delete an investment by ID' })
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invesmentService.remove(+id);
  }
}
