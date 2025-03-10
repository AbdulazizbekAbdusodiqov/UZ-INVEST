import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto, UpdateAdminDto } from './dto';
import { AdminGuard } from '../guards/admin.guard';
import { SuperAdminGuard } from '../guards/superAdmin.guard';
import { AdminSelfGuard } from '../guards/admin-self.guard';
import { ApiOperation, ApiProperty } from '@nestjs/swagger';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @ApiOperation({summary: 'Retrieve all admins'})
  @UseGuards(AdminGuard, SuperAdminGuard)
  @Get()
  findAll() {
    return this.adminService.findAll();
  }
  
  @ApiOperation({summary: 'Retrieve an admin by ID'})
  @UseGuards(AdminGuard, AdminSelfGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }
  
  @ApiOperation({summary: 'Update an admin by ID'})
  @UseGuards(AdminGuard, AdminSelfGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }
  
  @ApiOperation({summary: 'Delete an admin by ID'})
  @UseGuards(AdminGuard, SuperAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
