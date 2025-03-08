import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseInterceptors,
    UploadedFile,
    UploadedFiles,
} from "@nestjs/common";
import { ProjectService } from "./project.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { FileFieldsInterceptor, FilesInterceptor } from "@nestjs/platform-express";

@Controller("project")
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: "project_plan", maxCount: 1 },
        { name: "logo", maxCount: 1 }
    ]))
    create(
        @Body() createProjectDto: CreateProjectDto,
        @UploadedFiles() files: { project_plan?: any, logo?: any }
    ) {
        console.log(files); // Fayllarni tekshirish uchun
        const project_plan = files.project_plan ? files.project_plan[0] : null;
        const logo = files.logo ? files.logo[0] : null;
    
        return this.projectService.create(createProjectDto, project_plan, logo);
    }
    @Get()
    findAll() {
        return this.projectService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.projectService.findOne(+id);
    }

    @Patch(":id")
    update(
        @Param("id") id: string,
        @Body() updateProjectDto: UpdateProjectDto
    ) {
        return this.projectService.update(+id, updateProjectDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.projectService.remove(+id);
    }
}
