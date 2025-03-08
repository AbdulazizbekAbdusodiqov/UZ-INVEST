import { Injectable } from "@nestjs/common";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { PrismaService } from "../prisma/prisma.service";
import { AwsFileService } from "../upload/aws_upload.service";

@Injectable()
export class ProjectService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly awsFileService: AwsFileService
    ) {}

    async create(
        createProjectDto: CreateProjectDto,
        project_plan: any,
        logo: any
    ) {
        const resultPlan = await this.awsFileService.uploadFile(project_plan);
        const resultLogo = await this.awsFileService.uploadFile(logo);
        const {entreprenuerId, project_typeId,budged, ...data} = createProjectDto
        return this.prismaService.project.create({
            data: {
                ...data,
                entreprenuerId:+entreprenuerId,
                project_typeId: +project_typeId,
                budged : +budged,
                project_plan: resultPlan?.Location!,
                logo: resultLogo?.Location!,
            },
        });
    }

    findAll() {
        return this.prismaService.project.findMany();
    }

    findOne(id: number) {
        return this.prismaService.project.findUnique({ where: { id } });
    }

    update(id: number, updateProjectDto: UpdateProjectDto) {
        return this.prismaService.project.update({
            where: { id },
            data: updateProjectDto,
        });
    }

    remove(id: number) {
        return this.prismaService.project.delete({ where: { id } });
    }
}
