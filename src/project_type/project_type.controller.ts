import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProjectTypeService } from './project_type.service';
import { CreateProjectTypeDto } from './dto/create-project_type.dto';
import { UpdateProjectTypeDto } from './dto/update-project_type.dto';
import { AdminGuard } from '../guards/admin.guard';
import { UserGuard } from '../guards/user.guard';
import { ApiOperation } from '@nestjs/swagger';

@Controller('project-type')
export class ProjectTypeController {
  constructor(private readonly projectTypeService: ProjectTypeService) {}


  @ApiOperation({ summary: 'Create a new project type' })
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createProjectTypeDto: CreateProjectTypeDto) {
    return this.projectTypeService.create(createProjectTypeDto);
  }
  
  @ApiOperation({ summary: 'Get all project types' })
  @UseGuards(UserGuard)
  @Get()
  findAll() {
    return this.projectTypeService.findAll();
  }
  
  @ApiOperation({ summary: 'Get a project type by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectTypeService.findOne(+id);
  }
  
  @ApiOperation({ summary: 'Update a project type by ID' })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectTypeDto: UpdateProjectTypeDto) {
    return this.projectTypeService.update(+id, updateProjectTypeDto);
  }
  
  @ApiOperation({ summary: 'Delete a project type by ID' })
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectTypeService.remove(+id);
  }
}
