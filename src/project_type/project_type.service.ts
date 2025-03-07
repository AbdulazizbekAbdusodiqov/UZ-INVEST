import { Injectable } from '@nestjs/common';
import { CreateProjectTypeDto } from './dto/create-project_type.dto';
import { UpdateProjectTypeDto } from './dto/update-project_type.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectTypeService {
  constructor(private readonly prismaService: PrismaService) {}
  
  create(createProjectTypeDto: CreateProjectTypeDto) {
    return this.prismaService.projectType.create({ data: createProjectTypeDto });
  }

  findAll() {
    return this.prismaService.projectType.findMany();
  }

  findOne(id: number) {
    return this.prismaService.projectType.findUnique({ where: { id } });
  }

  update(id: number, updateProjectTypeDto: UpdateProjectTypeDto) {
    return this.prismaService.projectType.update({
      where: { id },
      data: updateProjectTypeDto,
    });
  }

  remove(id: number) {
    return this.prismaService.projectType.delete({ where: { id } });
  }
}
