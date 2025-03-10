import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProjectTypeService } from './project_type.service';
import { CreateProjectTypeDto } from './dto/create-project_type.dto';
import { UpdateProjectTypeDto } from './dto/update-project_type.dto';

@Controller('project-type')
export class ProjectTypeController {
  constructor(private readonly projectTypeService: ProjectTypeService) {}

  @UseGuards()
  @Post()
  create(@Body() createProjectTypeDto: CreateProjectTypeDto) {
    return this.projectTypeService.create(createProjectTypeDto);
  }
  
  @Get()
  findAll() {
    return this.projectTypeService.findAll();
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectTypeService.findOne(+id);
  }
  
  @UseGuards()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectTypeDto: UpdateProjectTypeDto) {
    return this.projectTypeService.update(+id, updateProjectTypeDto);
  }
  
  @UseGuards()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectTypeService.remove(+id);
  }
}
