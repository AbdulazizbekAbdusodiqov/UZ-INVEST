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
  async findTopProjectTypes(page: number = 1, pageSize: number = 10) {
    const total = await this.prismaService.project.count();

    const projectTypes = await this.prismaService.project.groupBy({
        by: ['project_typeId'],
        _count: {
            _all: true
        },
        orderBy: {
            _count: {
                project_typeId: 'desc'
            }
        },
        skip: (page - 1) * pageSize,
        take: pageSize
    });

    return {
        data: projectTypes.map(pt => ({
            typeId: pt.project_typeId,
            bidCount: pt._count?._all ?? 0
        })),
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize)
    };
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
