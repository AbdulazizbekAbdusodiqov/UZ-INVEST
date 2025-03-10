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
    UseGuards,
} from "@nestjs/common";
import { ProjectService } from "./project.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { FileFieldsInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { UserGuard } from "../guards/user.guard";
import { AdminGuard } from "../guards/admin.guard";
import { ApiOperation } from "@nestjs/swagger";

@Controller("project")
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @ApiOperation({ summary: 'Create a new project' })
    @UseGuards(UserGuard)
    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: "project_plan", maxCount: 1 },
        { name: "logo", maxCount: 1 },
        { name: "project_presentation", maxCount: 1 },
    ]))
    create(
        @Body() createProjectDto: CreateProjectDto,
        @UploadedFiles() files: { project_plan?: any, logo?: any,project_presentation?:any }
    ) {
        console.log(files); // Fayllarni tekshirish uchun
        const project_plan = files.project_plan ? files.project_plan[0] : null;
        const logo = files.logo ? files.logo[0] : null;
        const project_presentation = files.project_presentation ? files.project_presentation[0] : null;
        
        return this.projectService.create(createProjectDto, project_plan, logo,project_presentation);
    }

    @ApiOperation({ summary: 'Get all projects' })
    @Get()
    findAll() {
        return this.projectService.findAll();
    }
    
    @ApiOperation({ summary: 'Get a project by ID' })
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.projectService.findOne(+id);
    }

    @ApiOperation({ summary: 'Update a project by ID' })
    @UseGuards(AdminGuard)
    @Patch(":id")
    update(
        @Param("id") id: string,
        @Body() updateProjectDto: UpdateProjectDto
    ) {
        return this.projectService.update(+id, updateProjectDto);
    }
    
    @ApiOperation({ summary: 'Delete a project by ID' })
    @UseGuards(AdminGuard)
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.projectService.remove(+id);
    }
}
