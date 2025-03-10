import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto, UpdateAdminDto } from './dto';
import { AdminGuard } from '../guards/admin.guard';
import { SuperAdminGuard } from '../guards/superAdmin.guard';
import { AdminSelfGuard } from '../guards/admin-self.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @UseGuards(AdminGuard, SuperAdminGuard)
  @Get()
  findAll() {
    return this.adminService.findAll();
  }
  
  @UseGuards(AdminGuard, AdminSelfGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }
  
  @UseGuards(AdminGuard, AdminSelfGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }
  
  @UseGuards(AdminGuard, SuperAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
